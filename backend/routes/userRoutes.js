const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../config/multerConfig');

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with full name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "Full name must be alphabetic characters only."
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *                 description: "Must be a valid email format."
 *               password:
 *                 type: string
 *                 example: "Password@123"
 *                 description: "Must contain at least 8 characters, one uppercase, one lowercase, one digit, and one special character."
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully."
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid email format"
 */
router.post('/create', userController.createUser);

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user details
 *     description: Update a user's full name and password. Email cannot be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Updated"
 *                 description: "Full name must be alphabetic characters only."
 *               password:
 *                 type: string
 *                 example: "NewPassword@123"
 *                 description: "Must contain at least 8 characters, one uppercase, one lowercase, one digit, and one special character."
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *                 description: "Email cannot be changed."
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User updated successfully."
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid full name format."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 */
router.put('/edit', userController.updateUser);

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted successfully."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 */
router.delete('/delete', userController.deleteUser);

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     description: Get a list of all registered users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.get('/getAll', userController.getAllUsers);

/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload an image
 *     description: Upload an image for a user (JPEG, PNG, or GIF).
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Image uploaded successfully."
 *               filePath: "/uploads/john_doe.png"
 *       400:
 *         description: Invalid file format or size too large
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid file format. Only JPEG, PNG, and GIF are allowed."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       409:
 *         description: Image already exists for this user
 *         content:
 *           application/json:
 *             example:
 *               error: "Image already exists for this user"
 */
router.post('/uploadImage', upload.single('image'), userController.uploadImage);

router.post("/login", userController.login)

module.exports = router;
