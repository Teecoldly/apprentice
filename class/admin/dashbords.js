const con = require('../db');
// semter
function loadsemter(req, res) {
    con.query("SELECT   `Semester_set` FROM `Semester`", [], (err, result) => {
        if (err) throw err;
        else {
            res.send(result[0]);
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

function updatesemter(req, res) {
    con.query("UPDATE `Semester` SET `Semester_set`= ? WHERE `Semester` = 1", [req.body.semester], (err, result) => {
        if (err) throw err;
        else {
            res.send(JSON.stringify({
                status: "Success"
            }))
        }
    })
}

function project_count(professor_id) {
    const data = new Promise((resolve, reject) => {
        load_semester().then((semester) => {


            con.query("select COUNT(`project_id`) as number_project FROM project WHERE professor_id = ?  and `semeter_label`= ?", [professor_id, semester], (err, result) => {
                if (err) throw err;
                else {
                    resolve(result[0].number_project)
                }
            })
        })
    })
    return data
}

function project_count_test(professor_id) {
    const data = new Promise((resolve, reject) => {
        load_semester().then((semester) => {
            con.query("SELECT COUNT(caleder.event_id) as testcount FROM `project` INNER JOIN caleder on project.project_id = caleder.project_id WHERE project.`professor_id` = ? and project.`semeter_label`= ?", [professor_id, semester], (err, result) => {
                if (err) throw err;
                else {
                    resolve(result[0].testcount)
                }
            })
        })
    })
    return data;
}

function project_count_test_success(professor_id) {
    const data = new Promise((resolve, reject) => {
        load_semester().then((semester) => {
            con.query("SELECT cd.* from caleder cd INNER JOIN project pj on pj.project_id =  cd.project_id WHERE pj.professor_id = ? and pj.`semeter_label`= ?", [professor_id, semester], (err, result) => {
                if (err) throw err;
                else {
                    let count = 0;
                    result.forEach(element => {
                        let Datenow = new Date();
                        let date = new Date(element.date_timestemp);
                        let res_Data = getstatus((date - Datenow));
                        if (res_Data == 3) {
                            count++;
                        }
                    });
                    resolve(count);
                }
            })
        })
    });
    return data;
}

function project_count_test_notsuccess(professor_id) {
    const data = new Promise((resolve, reject) => {
        load_semester().then((semester) => {
            con.query("SELECT cd.* from caleder cd INNER JOIN project pj on pj.project_id =  cd.project_id WHERE pj.professor_id = ? and pj.`semeter_label`= ? ", [professor_id, semester], (err, result) => {
                if (err) throw err;
                else {
                    let count = 0;
                    result.forEach(element => {
                        let Datenow = new Date();

                        let date = new Date(element.date_timestemp);
                        let res_Data = getstatus((date - Datenow));


                        if (res_Data == 2 || res_Data == 1) {
                            count++;
                        }
                    });
                    resolve(count);
                }
            })

        })
    });
    return data;
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

function loadtable() {
    const data = new Promise((resolve, reject) => {
        con.query("SELECT * FROM caleder WHERE project_id IS NULL", (err, result) => {
            if (err) throw err;
            else {
                resolve(result);
            }
        })
    });
    return data;
}

function load_name_group(project_id) {
 
    let data = new Promise((resolve, reject) => {
        con.query("SELECT  `project_name` FROM `project` WHERE `project_id` = ?", [project_id], (err, result) => {
            if (err) throw err;
            else {
                if(result.length==0){
                    resolve("ไม่พบโปรเจค")
                }else{
                    resolve(result[0].project_name);
                }
               
            }
        })
    })
    return data ;
}
// semterend
module.exports = {
    semester_load: loadsemter,
    semester_update: updatesemter,
    project_count: project_count,
    project_test: project_count_test,
    project_notsuccess: project_count_test_notsuccess,
    project_success: project_count_test_success,
    load_Select_Stundent: loadtable,
    load_name_group:load_name_group

}