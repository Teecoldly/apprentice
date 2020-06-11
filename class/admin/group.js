const con = require('../db');

function group_add(req, res) {
    con.query("INSERT INTO `Director`( `Director_1`, `Director_2`, `Director_3`) VALUES (?,?,?) ", [req.body.pro_1, req.body.pro_2, req.body.pro_3], (err) => {
        if (err) throw err;
        else res.send({
            status: "success",
            msg: 'บันทึกข้อมูลสำเร็จ'
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

function random_group(req, res) {
    load_semester().then((semester) => {


        con.query("SELECT `project_id`, `project_name`, `professor_id`, `group_id` FROM `project` WHERE `group_id` IS NULL and semeter_label = ? ", [semester], (err, result) => {
            if (err) throw err;
            else {
                group_load().then((group_result) => {
                    let size_project = result.length;
                    let size_group = group_result.length
                    let result_project = result;
                    let result_group = group_result;
                    let result_t = [];
                    let Percent = [];

                    for (let i = 0; i < size_group; i++) {
                        Percent[i] = size_project / size_group;
                    }

                    result_project.forEach(element => {
                        let loop = true;
                        while (loop) {
                            let rdnum = getRndInteger(1, size_group);
                            if (result_group[rdnum - 1].Director_1 == element.professor_id || result_group[rdnum - 1].Director_2 == element.professor_id || result_group[rdnum - 1].Director_3 == element.professor_id) {
                                loop = true
                            } else {
                                loop = false
                                element.group_id = rdnum
                                result_t.push(element);
                                Percent[rdnum - 1] = Percent[rdnum - 1] - 1;
                            }
                        }

                    });
                    result_t.forEach(element => {
                        con.query("UPDATE `project` SET  `group_id` = ? WHERE `project_id` =?", [element.group_id, element.project_id], (err) => {
                            if (err) throw err;
                        })
                    });

                    res.send(JSON.stringify({
                        test: result_t,
                        status: "success",
                        msg: "บันทึกข้อมูลสำเร็จ"
                    }))


                })


            }
        })
    })
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function group_load() {
    const data = new Promise((resolve, reject) => {
        
            con.query("SELECT `group_id`, `Director_1`,CONCAT(ui_1.name ,' ' ,ui_1.lastname) as dir_1, `Director_2`,CONCAT(ui_2.name ,' ' ,ui_2.lastname)  as dir_2, `Director_3`,CONCAT(ui_3.name ,' ' ,ui_3.lastname) as dir_3 FROM `Director` LEFT JOIN  user_info as ui_1 on Director.Director_1 = ui_1.user_id LEFT JOIN user_info as ui_2 on Director.Director_2 = ui_2.user_id LEFT JOIN user_info as ui_3 ON  Director.Director_3 = ui_3.user_id", (err, result) => {
                if (err) throw err;
                else resolve(result);
            })
 
    })
    return data;
}

function update_group(req, res) {
    con.query("UPDATE `Director` SET  `Director_1`= ?,`Director_2`= ?,`Director_3`=? WHERE  `group_id` =?  ", [req.body.dir_1, req.body.dir_2, req.body.dir_3, req.body.group_id], (err) => {
        if (err) throw err;
        else res.send(JSON.stringify({
            status: "success",
            msg: "บันทึกข้อมูลสำเร็จ"
        }))

    })
}

function update_group_project(req, res) {
    con.query("UPDATE `project` SET  `group_id` = ? WHERE `project_id` =?", [req.body.group_id, req.body.project_id], (err) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "success",
                msg: "บันทึกข้อมูลสำเร็จ"
            }))
        }
    })
}

function group_student_load() {
    const data = new Promise((resolve, reject) => {
        load_semester().then((semester) => {
        con.query("SELECT `project_id`, `project_name` ,CONCAT(ui.name,' ',ui.lastname)as name,IFNULL(project.group_id,'ไม่มีคณะกรรมการ') as gruop FROM `project` INNER JOIN user_info ui on ui.user_id = project.professor_id LEFT JOIN  Director dt on dt.group_id = project.group_id where project.semeter_label = ? ",[semester], (err, result) => {
            if (err) throw err;
            else resolve(result);
        })
       });
    })
    return data
}
module.exports = {
    add: group_add,
    load: group_load,
    update: update_group,
    load_group_student: group_student_load,
    randgrouop: random_group,
    project_update: update_group_project
}