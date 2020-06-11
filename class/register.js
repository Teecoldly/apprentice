const con = require('./db')
const bcrypt = require('bcrypt');
const gmail = require('./gmail');
const salt_system = "IT-SBACNON by teecoldly (Corres_system)";

function register(req, res) {
    const loopbcrypt = 5;
    let date = new Date();
    let salt_new_gen = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


    let salt_user = new Promise((resolve) => {
        bcrypt.hash(salt_new_gen, loopbcrypt, (err, result_ency) => {
            if (err) throw new Error(err);
            resolve(result_ency);

        })
    })
    //check user step 1 
    con.query("SELECT `user_id` FROM `user_info` WHERE username =? ", [req.body.username], (err, result) => {
        if (err) throw err;
        else {
            if (result.length > 0) {
                res.send(JSON.stringify({
                    status: 'error',
                    msg: 'ชื่อผู้ใช้ถูกใช้งานไปแล้ว'
                }))

            } else {
                con.query("SELECT `user_id` FROM `user_info` WHERE email =? ", [req.body.email], (err, result) => {
                    if (err) throw errfcr
                    else {
                        if (result.length > 0) {
                            res.send(JSON.stringify({
                                status: 'error',
                                msg: 'อีเมล์ถูกใช้งานไปแล้ว'
                            }))
                        } else {
                            salt_user.then((salt) => {
                                bcrypt.hash(req.body.password + salt + salt_system, loopbcrypt, (err, pass_result) => {

                                    con.query("INSERT INTO `user_info`(  `username`, `password`, `email`, `salt`, `name`, `lastname`, `user_type`, `user_status`,gmail_uid) VALUES (?,?,?,?,?,?,?,?,?)", [req.body.username, pass_result, req.body.email, salt, req.body.name, req.body.lastname, 1, 0, req.body.token], (err) => {
                                        if (err) throw err;
                                        else {
                                            res.send(JSON.stringify({
                                                status: 'success',
                                                msg: 'ลงทะเบียนสำเร็จ'
                                            }))
                                        }
                                    })
                                })

                            })
                        }
                    }
                });
            }
        }
    })

}

function singtinbygoogle(req, res) {
    con.query("select * from user_info where gmail_uid = ? ", [req.body.token], (err, result) => {
        if (err) throw err;
        else {


            if (result.length > 0) {
                // login success 
                let data = result[0];
                req.session.user_id = data.user_id;
                req.session.name = data.name;
                req.session.lastname = data.lastname;
                req.session.level = data.user_type
              
                con.query("SELECT * FROM `user_info` WHERE `user_id` = ? and `user_status` =1  ", [ req.session.user_id ],(err, result) => {
                    if (err) throw err;
                    else if (result.length > 0) {
                        req.session.destroy();
                        res.send({
                            status: 'error',
                            msg: 'ชื่อผู้ใช้ถูกระงับกรุณาติดต่อหัวหน้าแผนกวิชา'
                        })
                    } else {
                        con.query("SELECT au.*,stud.project_id FROM `authentication` au INNER JOIN student stud on au.`id_card`= stud.student_id WHERE au.`user_id` = ? ", [data.user_id], (err, result) => {
                            if (err) throw err;
                            else if (result.length == 0) {
                                res.send(JSON.stringify({
                                    status: 'login'
                                }))
                            } else {
                                req.session.authen = result[0].project_id;
                                res.send(JSON.stringify({
                                    status: 'login'
                                }))
                            }
                        })  
                    }
                });
                 
            } else {
                // new user register 
                res.send(JSON.stringify({
                    status: 'new-user'
                }))
            }
        }
    })
}

function singtin(req, res) {
    const loopbcrypt = 5;
    con.query("SELECT salt,password,user_id,name,lastname,user_type  from user_info WHERE username =?", [req.body.username], (err, result) => {
        if (err) throw err;
        else {
            if (result.length > 0) {
                const data = result[0];
                bcrypt.compare(req.body.password + data.salt + salt_system, data.password, (err, result_t) => {
                    console.log(result_t);


                    if (!result_t) {
                        res.send(JSON.stringify({
                            status: 'error',
                            msg: 'username หรือ รหัสผ่านไม่ถูกต้อง'
                        }))
                    } else {
                        req.session.user_id = data.user_id;
                        req.session.name = data.name;
                        req.session.lastname = data.lastname;
                        req.session.level = data.user_type
                        con.query("SELECT * FROM `user_info` WHERE `user_id` = ? and `user_status` =1  ", [ req.session.user_id ],(err, result) => {
                            if (err) throw err;
                            else if (result.length > 0) {
                                req.session.destroy();
                                res.send({
                                    status: 'error',
                                    msg: 'ชื่อผู้ใช้ถูกระงับกรุณาติดต่อหัวหน้าแผนกวิชา'
                                })
                            } else {
                                con.query("SELECT au.*,stud.project_id FROM `authentication` au INNER JOIN student stud on au.`id_card`= stud.student_id WHERE au.`user_id` = ? ", [data.user_id], (err, result) => {
                                    if (err) throw err;
                                    else if (result.length == 0) {
                                        res.send(JSON.stringify({
                                            status: 'login'
                                        }))
                                    } else {
                                        req.session.authen = result[0].project_id;
                                        res.send(JSON.stringify({
                                            status: 'login'
                                        }))
                                    }
                                })
                            }
                        })

                    }
                })
            } else {
                res.send(JSON.stringify({
                    status: 'error',
                    msg: 'username หรือ รหัสผ่านไม่ถูกต้อง'
                }))
            }
        }
    })
}

function check_authen(req, res) {
    if (req.session.level == 2 || req.session.level == 3) { // owner

        res.send({

            status: 'success'
        })
    } else if (req.session.level == 1) {
        if (typeof req.session.authen == "undefined") {

            res.send({

                status: 'error'
            })


        } else {
            res.send({

                status: 'success'
            })
        }
    }
}

function reg_authen(req, res) {
    con.query("SELECT `student_id`,name,lastname,project_id FROM `student` WHERE `id_card` =  ?", [req.body.id_card], (err, result) => {
        if (err) throw err;
        else {
            if (result.length == 0) {
                res.send({
                    status: 'error',
                    msg: 'ไม่พบรหัสนักศึกษานี้'
                })
            } else {
                let id_card = result[0].student_id;
                let project_id = result[0].project_id;
                let name = result[0].name;
                let lastname = result[0].lastname;
                con.query("SELECT  * FROM `authentication`  WHERE `id_card` = ? ", [id_card], (err, result) => {
                    if (err) throw err;
                    else {
                        if (result.length > 0) {
                            res.send({
                                status: 'error',
                                msg: 'รหัสนักศึกษานี้มีผู้ใช้งานไปแล้ว'
                            })
                        } else {
                            con.query("INSERT INTO `authentication`( `user_id`, `id_card` ) VALUES (?,?)", [req.session.user_id, id_card], (err) => {
                                if (err) throw err;
                                else {
                                    req.session.name = name
                                    req.session.lastname = lastname
                                    req.session.authen = project_id;
                                    con.query("UPDATE `user_info` SET  `name` = ? , `lastname` =? WHERE `user_id`  =?",[name,lastname,req.session.user_id],(err)=>{
                                        res.send({
                                            status: "success",
                                            msg: 'ยืนยันนักศึกษาสำเร็จ'
                                        })
                                    })
                                     
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}

function hold_round_student(req, res) {
    con.query("select * FROM caleder WHERE project_id = ?", [req.session.authen], (err, result) => {
        if (err) throw err;
        else {
            if (result.length == 0) {
                con.query("UPDATE `caleder` set `project_id` = ? where  `event_id` = ?", [req.session.authen, req.body.event_id], (err) => {
                    if (err) throw err;
                    else {
                        res.send({
                            status: 'success',
                            msg: 'บันทึกการจองสำเร็จ'
                        })
                    }
                })
            } else {
                let check_event_not_end = 0; //เหตุการณ์ถูกจบหมดแล้ว
                let event = result;
                event.forEach(element => {
                    let date_now = new Date();
                    let date = new Date(element.date_timestemp);
                    date.setMinutes(date.getMinutes() + 15)
                    let result_diff_time = getstatus((date_now - date));
                    if (result_diff_time == 2 || result_diff_time == 3) {
                        check_event_not_end++;

                    }
                });
                if (check_event_not_end == 0) {
                    con.query("UPDATE `caleder` SET `project_id` =  ?  WHERE `event_id` =?", [req.session.authen, req.body.event_id], (err) => {
                        if (err) throw err;
                        else {
                            res.send({
                                status: 'success',
                                msg: 'บันทึกการจองสำเร็จ'
                            })
                        }
                    })
                } else {
                    res.send({
                        status: 'error',
                        msg: 'ไม่สามารถบันทึกการจองได้เนื่องจากกลุ่มนี้ได้จองการสอบไปแล้ว'
                    })
                }

            }
        }
    })
}

function update_userinfo(req, res) {
    let case_event = req.body.case_event;
    if (case_event == 0) {
        con.query("UPDATE `user_info` SET  `name` = ?, `lastname` = ? WHERE user_id = ?", [req.body.name, req.body.lastname, req.session.user_id], (err) => {
            if (err) throw err;
            else {
                req.session.name = req.body.name
                req.session.lastname = req.body.lastname
                res.send({
                    status: "success",
                    msg: "บันทึกข้อมูลสำเร็จ"
                })
            }
        })
    } else if (case_event == 1) {
        const loopbcrypt = 5;
        let date = new Date();
        let salt_new_gen = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        let salt_user = new Promise((resolve) => {
            bcrypt.hash(salt_new_gen, loopbcrypt, (err, result_ency) => {
                if (err) throw new Error(err);
                resolve(result_ency);

            })
        })

        salt_user.then((salt) => {
            bcrypt.hash(req.body.password + salt + salt_system, loopbcrypt, (err, pass_result) => {
                console.log(salt);
                console.log(pass_result);
                con.query("UPDATE `user_info` SET  `name` = ?, `lastname` = ?,`password` = ? ,salt=? WHERE user_id = ?", [req.body.name, req.body.lastname, pass_result, salt, req.session.user_id], (err) => {
                    if (err) throw err;
                    else {
                        req.session.name = req.body.name
                        req.session.lastname = req.body.lastname
                        res.send({
                            status: "success",
                            msg: "บันทึกข้อมูลสำเร็จ"
                        })
                    }
                })

            })

        })
    } else {
        res.send({
            status: "error",
            msg: "เกิดข้อผิดพลาด"
        })
    }

}

function loadevent(authen) {
    let data = new Promise((resolve, reject) => {
        con.query("SELECT `event_id`, `room`, `date_timestemp`, `project_id`, IFNULL( `comment`, 'ยังไม่ถูกส่งผลการสอบ')  as comment FROM `caleder` WHERE `project_id` = ? ", [authen], (err, result) => {
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    })
    return data;
}

function forgentpassword(req, res) {
    con.query("SELECT * FROM `user_info` WHERE `username` = ? and `email` = ?", [req.body.username, req.body.email], (err, result) => {
        if (err) throw err;
        else {
            if (result.length == 0) {
                res.send({
                    status: 'error',
                    msg: 'กรุณาตรวจสอบชื่อผู้ หรือ อีเมล์ใหม่'
                })
            } else {
                let user_id = result[0].user_id;
                const loopbcrypt = 5;
                let date = new Date();
                let salt_new_gen = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                let salt_user = new Promise((resolve) => {
                    bcrypt.hash(salt_new_gen, loopbcrypt, (err, result_ency) => {
                        if (err) throw new Error(err);
                        resolve(result_ency);

                    })
                })

                salt_user.then((salt) => {
                    let password = makepassword(8);
                    let mail = result[0].email;
                    let name = result[0].name;
                    bcrypt.hash(password + salt + salt_system, loopbcrypt, (err, pass_result) => {


                        con.query("UPDATE `user_info` SET  `password` = ? ,salt=? WHERE user_id = ?", [pass_result, salt, user_id], (err) => {
                            if (err) throw err;
                            else {
                                let text = "ระบบได้รีเซ็ครหัสผ่านใหม่ของคุณ : " + name + " \n รหัสผ่านใหม่คือ : " + password + "\n คุณสามารถแก้ไขรหัสผ่านได้ที่ตั้งค่า"
                                gmail.sendmail(mail, "ระบบกู้คืนรหัสผ่าน", text, res);
                            }
                        })

                    })

                })
            }
        }
    })
}

function makepassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getstatus(diff_number) {
    let time = diff_number / 1000;
    if (parseInt(time = time / 60) <= 0) {
        return 3
    } else if (parseInt(time) >= 0 && parseInt(time) <= 15) {
        return 2
    } else {
        return 1
    }
}
 
module.exports = {
    key: salt_system,
    register: register,
    singingoogle: singtinbygoogle,
    login: singtin,
    check: check_authen,
    regauthen: reg_authen,
    book_student: hold_round_student,
    book_student_load: loadevent,
    user_info_update: update_userinfo,
    resetpassword: forgentpassword
}