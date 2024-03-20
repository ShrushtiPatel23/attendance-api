const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");


module.exports = {

    createUser: async (req, res) => {

        try {
            // Check whether the user with this email exists already
            let admin = await User.findOne({ email: req.body.email });
            if (admin) {
                return res.status(201).json({
                    message: "Email already Exist"
                });
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);

            const secPass = await bcrypt.hash(req.body.password, salt)

           
            // Create a new admin
             admin = await User.create({
                email: req.body.email,
                password: secPass
            });
           
            return res.status(200).json({
                data: admin
            });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }

    },

    loginUser: async (req, res) => {

         try {
            let admin = await User.findOne({ email: req.body.email });
            if (!admin) {
                return res.status(201).json({
                    message: "Please try to login with correct email"
                });
            }
            
            const passwordCompare = await bcrypt.compare(req.body.password, admin.password);
            if (!passwordCompare) {
                return res.status(201).json({
                    message: "Password Is Incorrect"
                });
            }

            const data = {
                admin: {
                    id: admin._id
                }
            }
            console.log(data)
            const token = jwt.sign(data, process.env.JWT_SECRET);
            return res.status(200).json({
                authtoken: token,
                data,
                message: "Login Succesfully"

            });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: "Internal Server Error"
            });

        }
    
    },

}

