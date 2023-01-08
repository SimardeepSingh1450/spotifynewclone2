const express=require('express')
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
//spotify-uri
const { parse, formatEmbedURL } = require('spotify-uri')

//using spotify-web-api-node NPM package
const spotifyWebApi=require('spotify-web-api-node')


app.post('/spotifyLogin',async(req,res)=>{
    const code=req.body.code;
    //credentials setup from spotify-web-api-node NPM docs
    const spotifyApi=new spotifyWebApi({
        // redirectUri:'http://localhost:3000',
        redirectUri:'https://spotify-listen-1450.netlify.app/',
        clientId:'78d07a7eeacf40f88a43d72a7036b3ff',
        clientSecret:'e6a02c47e74c49d18940fb6bbe3f4738'
    })

    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken:data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn:data.body.expires_in
        })
    }).catch((err)=>{
        // console.log(err);
        res.sendStatus(400);
    })
})

app.post('/refresh',async(req,res)=>{
    const refreshToken=req.body.refreshToken
    //credentials setup from spotify-web-api-node NPM docs
    const spotifyApi=new spotifyWebApi({
        // redirectUri:'http://localhost:3000',
        redirectUri:'https://spotify-listen-1450.netlify.app/',
        clientId:'78d07a7eeacf40f88a43d72a7036b3ff',
        clientSecret:'e6a02c47e74c49d18940fb6bbe3f4738',
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(data=>{
        //sending to frontend
        res.json({
            accessToken:data.body.access_token,
            expiresIn:data.body.expires_in
        })
        console.log(data.body);
    }).catch((err)=>{
        console.log(err)
        // res.sendStatus(400);
    })
})


app.listen(process.env.PORT||3001,()=>{
    console.log('Server is running on port 3001...');
})