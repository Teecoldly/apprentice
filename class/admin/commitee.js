const con = require('../db')

function load_comment(profecser_id) {
    const data = new Promise((resolve, reject) => {
        load_semester().then((semester) => {
            con.query("SELECT pj.project_id,pj.`project_name`,CONCAT(ui.name ,' ' , ui.lastname) as pro_name  from project pj  INNER join user_info ui  on pj.professor_id = ui.user_id  INNER JOIN Director dtr on pj.group_id = dtr.group_id where (dtr.Director_1 = ? || dtr.Director_2 =? || dtr.Director_3 =?) and pj.semeter_label = ?", [profecser_id, profecser_id, profecser_id, semester], (err, result) => {
                if (err) throw err;
                else {
                    resolve(result);
                }
            })
        })
    })
    return data;
}

function load_event_comment(req, res) {
    con.query("SELECT `event_id` ,`date_timestemp`, `score`,`comment` FROM caleder WHERE `project_id` IS NOT NULL and `score` IS NULL and comment IS NULL and  project_id =  ?", [req.body.project_id], (err, result) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "success",
                data: result
            }))
        }
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

function show_event_comment(req, res) {
    con.query("SELECT  `date_timestemp`, `score`,`comment` FROM caleder WHERE `project_id` IS NOT NULL and `score` IS not NULL and comment IS not NULL and  project_id =  ?", [req.body.project_id], (err, result) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "success",
                data: result
            }))
        }
    })
}

function update_event_comment(req, res) {
    con.query("UPDATE `caleder` SET `score` =? ,`comment`= ? WHERE `event_id` =?", [req.body.score, req.body.comment, req.body.event_id], (err) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "success",
                msg: "บันทึกการสอบสำเร็จ"
            }))
        }
    })
}

function schedule_techerjs(user_id) {
    let data = new Promise((resolve, reject) => {
        load_semester().then((semester) => {
            con.query("SELECT `project_name`,caleder.* FROM `project` INNER JOIn caleder on project.project_id= caleder.project_id inner JOIN user_info ui on ui.user_id = project.professor_id INNER JOIN Director on project.group_id = Director.group_id WHERE ( Director.Director_1 =? or Director.Director_2 =? OR Director.Director_3=? ) and project.semeter_label = ?", [user_id,user_id,user_id,semester], (err, result) => {
                if(err) throw err ;
                else{
                    resolve(result);
                }
            })

        })
    })
    return data ;
}
module.exports = {
    load: load_comment,
    load_add_comment: load_event_comment,
    update_add_comment: update_event_comment,
    show_add_comment: show_event_comment,
    techer_schedule_load:schedule_techerjs
}