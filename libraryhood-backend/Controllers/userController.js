// const User = require('../Models/userModel')
// const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
// }


// const loginUser = async (req, res) => {
//   const {email, password } = req.body

//   try {
//     const user = await User.login(email, password )


//     const token = createToken(user._id)


//     res.status(200).json({email,id: user.id , token})
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// }




// const signupUser = async (req, res) => {
//   const {name ,email, password,} = req.body

//   try {
//     const user = await User.signup(name ,email, password)

//     const token = createToken(user._id)

//     res.status(200).json({name ,email,token})
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// }

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find(); // Retrieve all users from the database
//     res.status(200).json(users); // Send the retrieved users as a JSON response
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// const getUser = async (req ,res) => {
//       const {id} = req.params
//       if (!mongoose.Types.ObjectId.isValid(id)){
//           return res.status(404).json({error:'No such student found'})
//       }
  
//       const user = await Students.findById(id)
  
//       if (!user){
//           res.status(404).json({error:'No such workout'})
//       }
//       res.status(200).json(student)
//   };

//   const removeUser = async (req, res) => {
//     const { id } = req.params;
  
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: 'Invalid user ID' });
//     }
   
//     try {
//       const user = await User.findByIdAndDelete(id);
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  


// module.exports = { signupUser, loginUser ,getAllUsers , getUser , removeUser }


const UserModel = require('../Models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Reset Password Link',
      text: `http://localhost:5173/reset_password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send reset password email' });
      } else {
        return res.status(200).json({ status: 'Success', message: 'Reset password link sent to your email' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, id: user.id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.signup(name, email, password);

    const token = createToken(user._id);

    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ error: 'Invalid token' });
      } else {
        // Hash the new password
        const hash = await bcrypt.hash(password, 10);
        // Find the user by ID and update the password
        const user = await UserModel.findByIdAndUpdate(id, { password: hash });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ status: 'Success', message: 'Password reset successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { signupUser, loginUser, getAllUsers, getUser, removeUser, forgotPassword ,resetPassword };
