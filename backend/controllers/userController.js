const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Create User Endpoint
exports.createUser = async (req, res) => {
    const { fullName, email, password } = req.body;
  
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      return res.status(400).json({ error: 'Invalid full name' });
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        password
      )
    ) {
      return res.status(400).json({
        error:
          'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("🔐 Hashed password to be saved:", hashedPassword);
      console.log("🧾 Plain password received:", password);
  
      const user = new User({ fullName, email });
      user.password = hashedPassword; // ✅ force correct hash
      await user.save();
  
      console.log("✅ User saved:", user);
  
      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error("❌ Error creating user:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

exports.login = async (req, res) => {
    const { email, password } = req.body;
    // console.log("🟢 Login attempt:", email);
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      console.log("password -> ", password)
      console.log("user password -> ", user.password)
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log("isValidPassword -> ", isValidPassword)
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email
        }
      });
    } catch (error) {
    //   console.error('❌ Login error:', error.message);
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

        // Update full name if provided
        if (fullName) {
            if (!/^[a-zA-Z\s]+$/.test(fullName)) {
                return res.status(400).json({ error: 'Invalid full name' });
            }
            user.fullName = fullName;
        }

        // Update password if provided
        if (password) {
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
                return res.status(400).json({
                    error:
                        'Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, one number, and one special character.'
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

// ✅ Get All Users Endpoint
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()// Exclude password
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Upload Image Endpoint
const multer = require('multer');

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

// ✅ Middleware to handle file upload
exports.uploadMiddleware = upload.single('image');
