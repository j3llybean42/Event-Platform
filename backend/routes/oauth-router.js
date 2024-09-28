// import {logIn} from "../controllers/oauth.controllers"
// import {verifyGoogleToken} from "../models/oauth.models.js"
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const oAuthRouter = require("express").Router()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

// function upsert(array, item){
//     const i = array.findIndex((_item) => _item.email === item.email)
//     if (i > -1){
//         array[i] = item
//     } else {
//         array.push(item)
//     }
// }

// oAuthRouter.post('/login', async (req, res) => {
//     console.log(req.body)
//     const {token} = req.body
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: GOOGLE_CLIENT_ID
//     })
//     console.log(ticket)

//     const {name, email, picture} = ticket.getPayload()
//     upsert(users, {name, email, picture})
//     res.status(201)
//     res.json({name, email, picture})
// })

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        })
        return {payload: ticket.getPayload()}
    } catch (error) {
        return {error: "Invalid user detected. Please try again."}
    }
}

oAuthRouter.post("/login", async(req, res) => {
    try {
        if(req.body.credential){
            const verificationResponse = await verifyGoogleToken(req.body.credential)
            if(verificationResponse.error){
                return res.status(400).json({
                    message: verificationResponse.error
                })
            }

            const profile = verificationResponse?.payload

            res.status(201).json({
                message: "Login successful",
                user:{
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                    picture: profile?.picture,
                    email: profile?.email,
                    token: jwt.sign({email: profile?.email}, process.env.JWT_SECRET, {expiresIn: "1d"})
                }
            })
        }
    } catch (error) {
        res.status(500).json({message: error?.message || error})
    }
})

module.exports = oAuthRouter