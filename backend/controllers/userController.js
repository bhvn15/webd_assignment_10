const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// ✅ Create User Endpoint
exports.createUser = async (req, res) => {
  const { fullName, email, password, type } = req.body;

  if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    return res.status(400).json({ error: 'Invalid full name' });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)
  ) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, one number, and one special character.',
    });
  }

  if (!['admin', 'employee'].includes(type?.toLowerCase())) {
    return res.status(400).json({ error: 'User type must be admin or employee' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword, type });
    await user.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Login Endpoint
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("👉 Final login response:", {
      _id: user._id,
      email: user.email,
      type: user.type
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        type: user.type
      },
      token
    });

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ✅ Update User Endpoint
exports.updateUser = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (fullName) {
      if (!/^[a-zA-Z\s]+$/.test(fullName)) {
        return res.status(400).json({ error: 'Invalid full name' });
      }
      user.fullName = fullName;
    }

    if (password) {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)
      ) {
        return res.status(400).json({
          error: 'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, one number, and one special character.'
        });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete User Endpoint
exports.deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All Users Endpoint (Exclude password)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Upload Image Middleware
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.body.email}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/(jpeg|png|gif)$/)) {
      return cb(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'));
    }
    cb(null, true);
  }
});

exports.uploadMiddleware = upload.single('image');

// ✅ Upload Image Handler
exports.uploadImage = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.imagePath) {
      return res.status(400).json({ error: 'Image already exists for this user.' });
    }

    user.imagePath = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(201).json({
      message: 'Image uploaded successfully.',
      filePath: user.imagePath
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
