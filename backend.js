import express from "express";
import multer, { diskStorage } from "multer";
import nodemailer from "nodemailer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { Console } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app=express();
const port=3000;
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage , diskStorage });


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  app.use(bodyParser.urlencoded({ extended: true}));

  
app.post  ("/mail",upload.single("file"),async(req,res)=>{
    const {email,subject,composeMail}=req.body;
    const updatedFile = req.file;
    console.log(subject);
    console.log(updatedFile);
    const send = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:'virendrarp789rp@gmail.com',
            pass:'atoi iska aftp hial'
        }
       
        });
        const info = await send.sendMail({
            from:'<virendrarp789rp@gmail.com>',
            to:[email],
            subject:subject,
            text:composeMail,
            attachments: [
                {
                    filename: updatedFile.originalname,
                    content: updatedFile.buffer,

                }
            ]
            
        })
        
        console.log("message sent:"+ info.messageId);
        console.log("Accepted email"+info.accepted);
        console.log("Rejected email"+info.rejected);
        
res.send("Mail sended successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
