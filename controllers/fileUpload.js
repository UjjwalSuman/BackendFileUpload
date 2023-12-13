const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload -> Handler function

exports.localFileUpload = async (req, res) =>{
    try{
        //fetch file from request
        const file = req.files.file;
        console.log("File Aagayi ", file);

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.') [1]}`;
        console.log("Path", path);

        //add path to the move function
        file.mv(path, (err) =>{
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message: 'Local File Upload Successfully',
        });

    } catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka handler
exports.imageUpload =async(req, res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file =req.files.imageFile;
        console.log(file);
        
        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File Formate not supported',
            })
        }

        //file formate supported hai to
        const response = await uploadFileToCloudinary(file, "ujjwal");
        console.log(response);
        
        //db me entry save karni hai 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uploaded Successfully"
        });


    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrongg",
        })
    }
}


exports.videoUpload = async (req, res) =>{
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file =req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4", "mov","MP4"];
        const fileType = file.name.split('.')[1];

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File Formate not supported',
            })
        }

        //file formate supported hai to
        const response = await uploadFileToCloudinary(file, "ujjwal", 30);
        console.log(response);
        
        //db me entry save karni hai 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video Uploaded Successfully"
        });



    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}


exports.imageSizeReducer = async (req,res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        //TODO: add a upper limit of 5MB for Video
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        //TODO: height attribute-> COMPRESS
        const response = await uploadFileToCloudinary(file, "Codehelp", 90);
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}