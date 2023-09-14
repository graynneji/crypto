const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  // console.log(req.body);
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const clientIP = req.clientIP;
    const clientBrowser = req.clientBrowser;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      res.status(400);
      throw new Error('All fields are required!');
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error('An account is associated with this email!');
    }
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error('Passwords not the same!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      clientIP,
      clientBrowser,
    });
    if(user){
      const accessToken = jwt.sign(
        {
        user:{
          email: user.email,
          id: user.id
        },
    
      },
      process.env.ACCESS_TOKEN,
        { expiresIn: '1h' }
      )
   
    // if (user) {
      res.status(201).json({
        status: 'Success',
        data: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          clientIP: user.clientIP,
          clientBrowser: user.clientBrowser,
          accessToken,
        },
      });
    }
  } catch (err) {
    // console.error(err);
    res.status(400).json({
      status: 'Fail',
      message: err.message,
    });
  }
};




exports.login = async (req, res) => {
  const cookies = req.cookies
  console.log(`cookies available at login : ${JSON.stringify(cookies)}`)

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const user = await User.findOne({ email })

    if (!user) {

      res.status(400)
      throw new Error ("No account is associated with this user!")
    }
    
  
    //compare users
    if (user && (await bcrypt.compare(password, user.password))) {
   
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '10d' }
      );
      //refreshToken
const newRefreshToken = jwt.sign(

  {"email": user.email, "id": user.id},
  process.env.REFRESH_TOKEN_SECRET,
  {expiresIn: '1h'}
)




//changed to let keyword
let newRefreshTokenArray = (user.refreshToken || []).filter(rt => rt !== cookies.jwt) || [];
// let newRefreshTokenArray = (!cookies?.jwt ? user.refreshToken : user.refreshToken.filter(rt => rt !== cookies.jwt)) || [];

// let newRefreshTokenArray = !cookies?.jwt? user.refreshToken : user.refreshToken.filter(rt => rt !== cookies.jwt)

if(cookies?.jwt){
const refreshToken = cookies.jwt;
const foundToken = await User.findOne({refreshToken})


if(!foundToken){
  console.log(`attempt refresh token reuse at login`)

  newRefreshTokenArray = []
}
res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
}

//saving refresh token with current user
user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await user.save();
        console.log(result);


        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });




      const { password, ...others } = user._doc;
      res.status(200).json({
        status: 'Success',
        // _id: user.id,

        // email: user.email,
        others,
        accessToken,
      });
    } else {
      res.status(400)
      throw new Error ("Authentication failed. Incorrect email or password")
    }
  } catch (err) {
 return res.status(401).json({
  status: 'Fail',
  message: err.message,
});
  }
};














// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       res.status(400);
//       throw new Error('All fields are required');
//     }

//     const user = await User.findOne({ email });

//     if (!user) {

//       res.status(400)
//       throw new Error ("No account is associated with this user!")
//     }
    
  
//     //compare users
//     if (user && (await bcrypt.compare(password, user.password))) {
   
//       const accessToken = jwt.sign(
//         {
//           user: {
//             email: user.email,
//             id: user.id,
//           },
//         },
//         process.env.ACCESS_TOKEN,
//         { expiresIn: '1h' }
//       );
//       const { password, ...others } = user._doc;
//       res.status(200).json({
//         status: 'Success',
//         // _id: user.id,

//         // email: user.email,
//         others,
//         accessToken,
//       });
//     } else {
//       res.status(400)
//       throw new Error ("Authentication failed. Incorrect email or password")
//     }
//   } catch (err) {
//  return res.status(401).json({
//   status: 'Fail',
//   message: err.message,
// });
//   }
// };
