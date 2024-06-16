import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
};