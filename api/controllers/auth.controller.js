import bcrypt from "bcrypt";
import  User from '../models/user.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {

};

export const logout = async (req, res) => {

};

