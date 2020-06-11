const nodemail = require('nodemailer')
const transporter = nodemail.createTransport({
    service:'gmail',
    auth:{
        user: 'corres.system.it.sbac@gmail.com',
        pass: 'love4542'
      }
})
function sendmail(toemail,subject,text,res) {
    //option mail
    const mailoptions = {
        from:'corres.system.it.sbac@gmail.com',
        to : toemail,
        subject : subject,
        text :text
    }
    transporter.sendMail(mailoptions, function(error, info){
        if (error)  throw error 
         else {
            res.send({
                status:"success",
                msg:"กรุณาตรวจสอบรหัสผ่านใหม่ในอินบล็อก"
            })
        }
      });
}

 module.exports={
     sendmail:sendmail
 }