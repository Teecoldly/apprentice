const con = require('../db');

function loadprofessor() {
    const data = new Promise((resolve, reject) => {

        con.query("SELECT user_id, `name`, `lastname`, `user_type`, `user_status` FROM `user_info` WHERE `user_type` = 2 or `user_type` =3", [], (err, result) => {
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    });
    return data ;
}
function loadleveltechonly() {
    const data = new Promise((resolve, reject) => {
        con.query("SELECT `user_id`,  `name`, `lastname`,   `user_status`  FROM `user_info` WHERE user_status=0 and user_type =2",(err,result)=>{
            if(err) throw err 
            else resolve(result)
        })
    });
    return data ; 
}
function loadstudent( ) {
    const data = new Promise((resolve, reject) => {

        con.query("SELECT  user_id,username, `name`, `lastname` from user_info where   `user_type` = 1 and `user_status` =0", [], (err, result) => {
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    });
    return data ;
  }
function add_professor(req,res){
    con.query("UPDATE `user_info` SET  `user_type` = 2 WHERE `user_id` = ? ",[req.body.user_id],(err)=>{
        if(err) throw err;
        else{
            res.send(JSON.stringify({
                status:"success"
            }))
        }
    })
}
function update_professor(req,res){
    con.query("UPDATE `user_info` SET  `user_type`  = ?  WHERE `user_id` = ? ",[req.body.user_type,req.body.user_id],(err)=>{
        if(err) throw err;
        else{
            res.send(JSON.stringify({
                status:"success"
            }))
        }
    })
}
function ban_professor(req,res){
    con.query("UPDATE `user_info` SET  `user_status` =?  WHERE `user_id` =?",[req.body.ban_status ,req.body.ban_id],(err)=>{
        if(err) throw err;
        else{
            res.send(JSON.stringify({
                status:"success"
            }))
        }
    })
}
function load_profect_trefer(req,res){
    con.query("SELECT  `user_id`,`username` , `name`,`lastname` FROM user_info WHERE (`user_status` =0 and `user_type` =2 or user_type =3 )and user_id !=?",[req.body.user_id],(err,result)=>{
        if(err) throw err;
        else{
            res.send({
                data: result
            })
        }
    })
}
function update_trefer_student(req,res) {
    con.query("UPDATE `project` SET  `professor_id` = ? WHERE `professor_id` = ?",[req.body.user_set , req.body.owner],(err)=>{
        if(err) throw err;
        else{
            res.send({
                status:"success",
                msg:"โอนย้ายที่นักศึกษาดูแลให้ที่ปรึกษาใหม่สำเร็จ"
            })
        }
    })
}
 
module.exports = {
    professor_load:loadprofessor,
    student_load :  loadstudent,
    professor_add:add_professor,
    professor_update : update_professor,
    professor_ban : ban_professor,
    professor_level_load : loadleveltechonly,
    load_user_trefer:load_profect_trefer,
    update_user_tefer:update_trefer_student,
 
}