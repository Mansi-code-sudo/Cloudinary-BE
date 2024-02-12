const mongoose=require("mongoose");
const nodemailer=require("nodemailer");

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageURL:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

fileSchema.post("save",async function (doc){
    try{
        let transporter=nodemailer.createTransport({
            service:"gmail",
            port:465,
            secure:true,
            logger:true,
            debug:true,
            secureConnection:false,
            auth:{
                user:"mailtomansi108@gmail.com",
                pass:"jufy sjhl bilq eiwe",
            },
            tls:{
                rejectUnauthorized:true,
            },
        });

        //send email
        let info=await transporter.sendMail({
            from:`Mansi`,
            to:doc.email,
            subject:"File Uploaded",
            html:`<h1> Assignment krde python ka</h1>`,
        })
    }
    catch(error){
        console.error(error);
    }
})

const File=mongoose.model("File",fileSchema);
module.exports=File;
