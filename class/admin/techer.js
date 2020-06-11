const con = require('../db');

function project_add(req, res) {
    load_semester().then((semeter) => {
        con.query("INSERT INTO `project`( `project_name`, `professor_id`,semeter_label) VALUES ( ?,?,?)", [req.body.name_project, req.session.user_id, semeter], (err) => {
            if (err) throw err;
            else {
                res.send(JSON.stringify({
                    status: "success"
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

function load_project(req) {



    const data = new Promise((resolve, reject) => {
        load_semester().then((semeter) => {
            con.query("SELECT project.* ,IFNULL(gruopstudent.countp, 0) as countp  FROM `project` left JOIN ( SELECT count(`project_id`) as countp ,project_id FROM student GROUP BY project_id) as gruopstudent on project.project_id = gruopstudent.project_id WHERE project.professor_id= ?  and project.semeter_label = ? ", [req.session.user_id,semeter], (err, result) => {
                if (err) throw err;
                else {
                    resolve(result);
                }
            })
        });
    })
    return data;
}

function student_insert(req, res) {

    let endprogram = 1;
    let data = JSON.parse(req.body.data);
    let result_check = new Promise((resolve, reject) => {
        for (let i = 1; i <= data.size; i++) {
            con.query("SELECT *  FROM `student` WHERE id_card = ? ", [data[i].id_card], (err, result) => {

                if (err) throw err;
                else {
                    if (result.length != 0) {
                        res.send(JSON.stringify({
                            status: "error",
                            msg: "รหัสนักศึกษานี้ " + data[i].id_card + " มีอยู่ในระบบแล้ว "
                        }))
                        resolve(0);



                    }
                }


            })

        }
        resolve(1);
    })


    result_check.then((endprogram) => {



        if (endprogram == 1) {
            for (let i = 1; i <= data.size; i++) {
                con.query("INSERT INTO `student`( `id_card`, `name`, `lastname`, `project_id`) VALUES (?,?,?,?)", [data[i].id_card, data[i].name, data[i].lastname, data.project_id], (err, result) => {
                    if (err) throw err;
                })
            }
            res.send({
                status: "success",
                msg: "บันทึกข้อมูลสำเร็จ"
            })
        }

    })
}

function update_name_project(req, res) {
    con.query("UPDATE `project` SET  `project_name` = ? WHERE `project_id` = ?", [req.body.project_name, req.body.project_id], (err, resut) => {

        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "success",
                msg: "บันทึกสำเร็จ"
            }))
        }

    })

}

function student_load(req, res) {
    con.query("SELECT   `id_card`, `name`, `lastname`  FROM `student`  WHERE `project_id` = ?", [req.body.project_id], (err, result) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                data: result
            }))
        }
    })
}

function show_comment(req, res) {
    con.query("SELECT room,`date_timestemp`, `score`,`comment`,project.group_id FROM caleder LEFT JOIN  project ON project.project_id = caleder.project_id WHERE   caleder.project_id = ?", [req.body.project_id], (err, result) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "success",
                data: result
            }))
        }
    })
}

function update_name_by_studentid(req, res) {
    con.query("UPDATE `student` SET  `name` = ? WHERE `id_card`  = ?", [req.body.name, req.body.student_id], (err) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "success"
            }))
        }
    })
}

function update_lastname_by_studentid(req, res) {
    con.query("UPDATE `student` SET  `lastname` = ? WHERE `id_card`  = ?", [req.body.lastname, req.body.student_id], (err) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "success"
            }))
        }
    })
}

function delte_project_group(req, res) {
    con.query("DELETE FROM `project` WHERE `project_id`=?", [req.body.grop_id], (err) => {
        if (err) throw err;
        else {
            res.send({
                status: "success",
                msg: "ลบข้อมูลโปรเจคเรียบร้อยแล้ว"
            })
        }
    })
}
module.exports = {
    project_add: project_add,
    project_load: load_project,
    project_student_insert: student_insert,
    project_student_load: student_load,
    show_comment: show_comment,
    project_rename: update_name_project,
    update_name_student: update_name_by_studentid,
    update_lastname_student: update_lastname_by_studentid,
    delete_project: delte_project_group

}