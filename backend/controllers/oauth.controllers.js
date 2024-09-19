const { verifyGoogleToken } = require("../models/oauth.models");

async function signUp(req, res) {
    try {
        // console.log({ verified: verifyGoogleToken(req.body.credential) });
        if (req.body.credential) {
        const verificationResponse = await verifyGoogleToken(req.body.credential)
    
          if (verificationResponse.error) {
            return res.status(400).json({
              message: verificationResponse.error,
            });
          }
    
          const profile = verificationResponse?.payload;
    
          res.status(201).json({
            message: "Signup was successful",
            user: {
              firstName: profile?.given_name,
              lastName: profile?.family_name,
              picture: profile?.picture,
              email: profile?.email,
              token: jwt.sign({ email: profile?.email }, "myScret", {
                expiresIn: "1d",
              }),
            },
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "An error occurred. Registration failed.",
        });
      }
}

async function logIn(req, res) {
    try {
        if (req.body.credential) {
          const verificationResponse = await verifyGoogleToken(req.body.credential);
          if (verificationResponse.error) {
            return res.status(400).json({
              message: verificationResponse.error,
            });
          }
    
          const profile = verificationResponse?.payload;
    
          res.status(201).json({
            message: "Login was successful",
            user: {
              firstName: profile?.given_name,
              lastName: profile?.family_name,
              picture: profile?.picture,
              email: profile?.email,
              token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
                expiresIn: "1d",
              }),
            },
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error?.message || error,
        });
      }
}

module.exports = {signUp, logIn}