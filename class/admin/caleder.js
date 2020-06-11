const con = require('../db');

function add_event(req, res) {
    load_semester().then((semester) => {


        con.query("INSERT INTO `caleder`(  `room`, `date_timestemp`,`semeter_label`) VALUES (?,? ,?)", [req.body.detail, req.body.timetemp,semester], (err) => {
            if (err) throw err;
            else {
                res.send(JSON.stringify({
                    status: "Success",
                    msg: "เพิ่มตารางการสอบสำเร็จ"
                }))
            }
        })
    })
}

function load_semester() {
    let data = new Promise((resolve, reject) => {
        con.query("SELECT `Semester_set` FROM `Semester`", (err, result) => {
            if (err) throw err;
            else {
                resolve(result[0].Semester_set);
            }
        })
    })
    return data;
}

function load_event() {


    const data = new Promise((resolve, reject) => {
        load_semester().then((semester) => {


            con.query("SELECT `event_id`, `room`, `date_timestemp`,  IFNULL( caleder.`project_id`, 'วันเวลายังไม่ถูกจอง') as id_project , IFNULL( pj.project_name, 'วันเวลายังไม่ถูกจอง') as project_name,IFNULL(CONCAT(ui.name,' ' ,ui.lastname), 'วันเวลายังไม่ถูกจอง') as name FROM caleder LEFT JOIN project pj on pj.project_id = caleder.project_id LEFT JOIN user_info ui on ui.user_id = pj.professor_id where caleder.semeter_label = ? ", [semester], (err, result) => {
                if (err) throw err;
                else {
                    resolve(result);
                }
            })
        })
    })
    return data;
}

function update_event(req, res) {
    con.query("UPDATE `caleder` SET  `room`= ?  ,`date_timestemp`= ?WHERE `event_id` = ? ", [req.body.details, req.body.timestemp, req.body.event_id], (err, result) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "Success",
                msg: "แก้ไขเหตุการณ์สำเร็จ"
            }))
        }
    })
}

function delete_event(req, res) {
    con.query("DELETE FROM `caleder` WHERE event_id = ? ", [req.body.event_id], (err, result) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "Success",
                msg: "ลบเหตุการณ์สำเร็จ"
            }))
        }
    })
}
module.exports = {
    add: add_event,
    load: load_event,
    edit: update_event,
    delete: delete_event
}