const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

//uploading file to a local server

exports.localFileUpload=async (req,res)=>{
    try{
        //fetch file
        const file=req.files.file;
        //setting servers directory 
        let path=__dirname+ "/file" + `.${file.name.split(".")[1]}`;

        file.mv(path, (err)=>{
            console.log(err);
        })

        res.json({
            success:true,
            message:"File uploaded at server successfully",
        });

    }
    catch(err){
        console.log(err);
    }
}

//uploading an image at cloudinary


function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const options={folder};
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload=async (req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        const file=req.files.imageFile;

        //validation for file
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //upload to cloudinary
        const response=await uploadFileToCloudinary(file,"Codehelp")

        //db me entry save krni hai
        const fileData=await File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully",
        })
    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    }
}



exports.videoUpload=async (req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        const file=req.files.videoFile;

        //validation for file
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //upload to cloudinary
        const response=await uploadFileToCloudinary(file,"Codehelp");

        //db me entry save krni hai
        const fileData=await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,
        });

        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:"Image uploaded successfully",
        })
    }
    catch(err){
        console.error(err);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    }
}