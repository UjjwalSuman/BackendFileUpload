const cloudinary = require('cloudinary').v2;


exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            // cloud_name:process.env.CLOUD_NAME,
            // api_key: process.env.API_KEY,
            // api_secret: process.env.API_SECRET,
            cloud_name:'dagnvnglm',
            api_key:'981646744474671',
            api_secret:'d8zo3orbjenLG-3vpnIsOV_Nnic',
        })
    } catch(error){
        console.log(error);
    }
}