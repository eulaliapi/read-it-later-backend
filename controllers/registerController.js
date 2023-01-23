const User = require('../models/User');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({"message": "name, email and password are required"});
    }

    const duplicate = await User.findOne({email: email}).exec();

    if(duplicate) {
        return res.status(409).json({"message": "user already exists"});
    }

    try{
        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            "name": name,
            "email": email,
            "password": hashedPwd
        })

        res.status(201).json({"message": `new user (${newUser.email}) created`});

    }catch(err) {
        res.status(500).json({"message": err.message});
    }
};

module.exports = {createNewUser};