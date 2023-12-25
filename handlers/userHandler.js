const User = require('../models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const {generateAccessToken,generateRefreshToken} = require('../middlewares/genToken')
const {sendMail} = require('../helpers/send_mail')
const cache = require('memory-cache');

const fetch_users = async (req,res) => {
    try {
       const users =  await User.find() 
       if (users.length() > 0) {
           res.status(200).json({"success":true,"info":users})
       }else{
        return res.status(400).json({"success":false,"info":"No registered users found"})
       }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({"success":false,"info":"unable to fetch users"})
    }
}

const fetch_user_by_id = async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            return res.status(200).json({"success":true,"info":user})
        }else{
            return res.status(400).json({"success":false,"info":"No user found"})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({"success":false,"info":"unable to fetch user"})
    }
}

// TODO:send verification mail to user and resend mail
const sendOtp = async (email) => {
    try {
        const otp = Math.floor(10000 + Math.random() * 90000)
        const user = await User.findOne({ email });

        const username = user.username

        // Send the OTP to the user's email
        const mailSubject = "Complete your registration";
        let content =`<!DOCTYPE html>

        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
            * {
            box-sizing: border-box;
            }
        
            body {
            margin: 0;
            padding: 0;
            }
        
            a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            }
        
            p {
            line-height: inherit
            }
        
            .desktop_hide,
            .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
            }
        
            .image_block img+div {
            display: none;
            }
        
            @media (max-width:620px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }
        
            .icons-inner {
                text-align: center;
            }
        
            .icons-inner td {
                margin: 0 auto;
            }
        
            .row-content {
                width: 100% !important;
            }
        
            .mobile_hide {
                display: none;
            }
        
            .stack .column {
                width: 100%;
                display: block;
            }
        
            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }
        
            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        
            .row-1 .column-1 .block-6.text_block td.pad {
                padding: 30px 30px 25px !important;
            }
        
            .row-1 .column-1 .block-5.heading_block h1 {
                font-size: 39px !important;
            }
        
            .row-1 .column-1 .block-4.text_block td.pad {
                padding: 30px 20px 20px !important;
            }
        
            .row-1 .column-1 .block-3.text_block td.pad {
                padding: 10px 10px 15px 15px !important;
            }
        
            .row-1 .column-1 .block-2.image_block td.pad {
                padding: 30px 30px 30px 20px !important;
            }
            }
        </style>
        </head>
        <body style="background-color: #76c8f7; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #76c8f7;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5; background-image: url(''); background-position: center top; background-repeat: repeat;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 600px;" width="600">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 15px; padding-left: 10px; padding-right: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <div class="spacer_block block-1" style="height:39px;line-height:39px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:45px;padding-left:40px;padding-right:30px;padding-top:30px;width:100%;">
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:15px;padding-left:40px;padding-right:10px;padding-top:10px;">
        <div style="font-family: Tahoma, Verdana, sans-serif">
        <div class="" style="font-size: 14px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 16.8px; color: #000000; line-height: 1.2;">
        <p style="margin: 0; font-size: 38px; text-align: left; mso-line-height-alt: 45.6px;"><span style="font-size:38px;"><span style=""><strong><span style="">Finish creating</span></strong></span><span style=""><strong><span style=""> </span></strong></span></span></p>
        <p style="margin: 0; font-size: 38px; text-align: left; mso-line-height-alt: 45.6px;"><span style="font-size:38px;"><strong><span style="">your account</span></strong></span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="45" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad">
        <div style="font-family: Arial, sans-serif">
        <div class="" style="font-size: 14px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 28px; color: #000000; line-height: 2;">
        <p style="margin: 0; font-size: 15px; text-align: left; mso-line-height-alt: 30px;"><span style="font-size:15px;">Hi there,${username}</span></p>
        <p style="margin: 0; font-size: 15px; text-align: left; mso-line-height-alt: 28px;"> </p>
    
        </div>
        </div>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="20" cellspacing="0" class="heading_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad">
        <h1 style="margin: 0; color: #5327b5; direction: rtl; font-family: 'Varela Round', 'Trebuchet MS', Helvetica, sans-serif; font-size: 53px; font-weight: 700; letter-spacing: 24px; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>${otp}</strong></h1>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="45" cellspacing="0" class="text_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad">
        <div style="font-family: Arial, sans-serif">
        <div class="" style="font-size: 14px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 28px; color: #000000; line-height: 2;">
        <p style="margin: 0; font-size: 15px; mso-line-height-alt: 30px;"><span style="font-size:15px;">If you did not associate your address with DaemonVault account, please ignore this message and do not click on the link above.</span></p>
        <p style="margin: 0; font-size: 15px; mso-line-height-alt: 30px;"><span style="font-size:15px;"> </span></p>
        <p style="margin: 0; font-size: 15px; mso-line-height-alt: 30px;"><span style="font-size:15px;">If you experience any issues, don't hesitate to reach out to our support team 👉 <a href="mailto:daemonlite73@gmail.com" rel="noopener" style="text-decoration: underline; color: #ef0c0c;" target="_blank" title="hello@use.com">here</a></span></p>
        <p style="margin: 0; font-size: 15px; mso-line-height-alt: 30px;"><span style="font-size:15px;"> </span></p>
        <p style="margin: 0; font-size: 15px; mso-line-height-alt: 30px;"><span style="font-size:15px;"> </span></p>
        <p style="margin: 0; font-size: 15px; mso-line-height-alt: 30px;"><span style="font-size:15px;">Best Regards</span></p>
        <p style="margin: 0; font-size: 15px; mso-line-height-alt: 30px;"><span style="font-size:15px;color:#5327b5;"><strong><span style="">Team DaemonVault</span></strong></span></p>
        </div>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table><!-- End -->
        </body>
        </html>
        `
    
        await sendMail(email, mailSubject, content);

        // Store the OTP in cache
        cach = cache.put(email, otp);
        console.log(cach)
        
        return { success: true, info: "OTP sent successfully" };
        
    } catch (error) {
        console.log(error);
        throw new Error("An error occurred");
    }
};

const register_user = async (req, res) => {
    try {
        const { username, fullname, email, phone, password } = req.body

        if (!username || !fullname || !email || !phone || !password) {
            return res.status(400).json({ "success": false, "info": "all fields are required" })
        }

        const users = await User.findOne({ email })
        if (users) {
            return res.status(400).json({ "success": false, "info": "user already exists" })
        }

        if (phone.length !== 10) {
            return res.status(400).json({ "success": false, "info": "invalid phone number" })
        }

        if (!/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password) || password.length < 8) {
            return res.status(400).json({ "success": false, "info": "password must contain at least one capital letter, one symbol, and be at least 8 characters long" })
        }
        
       const hashed_passsword = await bcrypt.hash(password, 10)

       const user = await User.create({
           username,
           fullname,
           email,
           phone,
           password: hashed_passsword
       })


        if (user) {
            sendOtp(email)
           return res.status(200).json({ "success": true, "info": "user created successfully, check your email for otp" })
       }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "success": false, "info": "unable to register user" })
    }
}

const login_user = async (req,res) => {
    try {
        const {email,password} = req.body

        if (!email || !password){
            return res.status(400).json({"success":false,"info":"email or password is missing"})
        }

        const user  = User.findOne({email})

        if (!user){
            return res.status(404).json({"success":false,"info":"Email entered does not exist"})
        }

        pass = bcrypt.compare(user.password,password)
        access_token = generateAccessToken(user._id)
        refresh_token = generateRefreshToken(user._id)

        if (pass){
            return res.status(200).json({
                "success":true,
                "info":{
                    "access_token":access_token,
                    "refresh_token":refresh_token
                }
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({"success":false,"info":"an error ocurred"})
    }
}


const resend_otp = async (req, res) => {
    try {
        const { email } = req.body;
        await sendOtp(email);

        return res.status(200).json({ success: true, info: "OTP resent successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, info: "An error occurred" });
    }
};


const verify_email = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        // Retrieve the stored OTP from the cache
        const storedOtp = cache.get(email);

        // Check if the stored OTP matches the OTP provided in the request
        if (!storedOtp || storedOtp !== parseInt(otp)) {
            return res.status(400).json({ success: false, info: "Invalid OTP" });
        }

        // Update the user's email verification status in the database
        const updatedUser = await User.findOneAndUpdate({ email }, { emailVerified: true }, { new: true });

        // Remove the OTP from the cache only if the OTP passed is correct
        if (storedOtp === parseInt(otp)) {
            cache.del(email);
        }

        return res.status(200).json({ success: true, info: "Email verified successfully",  });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, info: "An error occurred" });
    }
};




const upload_profile_image = async (req, res) => {
    try {
        const { userId, image } = req.body;

        if (!userId || !image) {
            return res.status(400).json({ "success": false, "info": "Kindly enter required fields" });
        }

        // Retrieve user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ "success": false, "info": "User not found" });
        }

        // Upload profile image to Cloudinary
        let profileImageUrl;
        try {
            const result = await cloudinary.uploader.upload(image);
            profileImageUrl = result.secure_url;
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Failed to upload profile image" });
        }

        // Update user's profile image
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profile: profileImageUrl,
            },
            { new: true } 
        );

        return res.status(200).json({ "success": true, "info": "Profile image uploaded successfully", "user": updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "success": false, "info": "An error occurred during profile upload" });
    }
};

const updateUserInfo = async (req, res) => {
    const { id,updatedInfo } = req.body;
    
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updatedInfo, {
        new: true,
      });
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update user info" });
    }
  };


  const deleteUser = async (req, res) => {
    try {
      const { id } = req.body;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete user" });
    }
  };

module.exports  = {
    fetch_users,
    fetch_user_by_id,
    register_user,
    login_user,
    verify_email,
    resend_otp,
    upload_profile_image,
    updateUserInfo,
    deleteUser
}