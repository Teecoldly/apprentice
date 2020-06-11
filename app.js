 const express = require('express');
 const session = require('express-session');
 const bodyParser = require('body-parser');
 const path = require('path');
 const reg = require('./class/register')
 const c_admin = require('./class/admin/dashbords');
 const app = express();
 const professor = require('./class/admin/professor');
 const c_techer = require('./class/admin/techer');
 const group = require('./class/admin/group');
 const event = require('./class/admin/caleder');
 const comment = require('./class/admin/commitee');
 const dashbord = require('./class/admin/dashbords')

 app.use(bodyParser.urlencoded({
     extended: false
 }));
 app.use(bodyParser.json());
 app.use(session({
     secret: 'apprentice',
     resave: false,
     saveUninitialized: true
 }))
 app.set('view engine', 'ejs');
 app.set('views', 'public');
 app.use(express.json());
 app.use(express.static(path.join(__dirname, 'public')));
 app.get('/', (req, res) => {
     if (typeof req.session.user_id == "undefined") {
         res.render('login');

     } else {
        Promise.all([
            dashbord.project_count(req.session.user_id),
            dashbord.project_test(req.session.user_id),
            dashbord.project_notsuccess(req.session.user_id),
            dashbord.project_success(req.session.user_id),
             dashbord.load_Select_Stundent(),
             reg.book_student_load(req.session.authen),
             comment.techer_schedule_load(req.session.user_id),
             dashbord.load_name_group(req.session.authen)
        
        ]).then((value)=>{
            res.render('index', {
                name: req.session.name +' '+ req.session.lastname  ,
                level: req.session.level,
                project:[value[0],value[1],value[2],value[3]],
                student:value[4],
                event_Student :value[5],
                techer_schedule : value[6],
                name_group :  value[7]
            
            })
        })
        
     }

 })
 //   authen 
 app.post("/authen/check",(req,res)=>{
     reg.check(req,res);
 })

 app.post('/authen/register',(req,res)=>{
     reg.regauthen(req,res);
 })

 app.post('/event/hold',(req,res)=>{
     reg.book_student(req,res);
 })
 // end   authen 
 app.get('/professor', (req, res) => {
     if (req.session.level != 3) {
         res.redirect('/');
     } else {

         Promise.all([professor.professor_load(), professor.student_load()]).then((data) => {
             res.render('control/admin/professor', {
                 name: req.session.name,
                 user_data: data[0],
                 combo_student_data: data[1],
                 level: req.session.level,
                 
             })
         })
     }
 })
 app.post('/professor/add', (req, res) => {
     professor.professor_add(req, res);
 })
 app.post('/professor/updare', (req, res) => {
     professor.professor_update(req, res);
 })
 app.post('/professor/ban', (req, res) => {
     professor.professor_ban(req, res);
 })
 app.post('/professor/terfer/load',(req,res)=>{
     professor.load_user_trefer(req,res);
 })
 app.post('/professor/terfer/update',(req,res)=>{
     professor.update_user_tefer(req,res);
 })

 // register file
 app.post('/student/login', (req, res) => {
     reg.login(req, res)
 })
 app.post('/student/register', (req, res) => {
     reg.register(req, res)
 })
 app.post('/student/google/check', (req, res) => {
     reg.singingoogle(req, res)
 })
 // register file end
 // admin/dashbords.js
 app.post('/semester/load', (req, res) => {
     c_admin.semester_load(res, res);
 })
 app.post('/semester/update', (req, res) => {
     c_admin.semester_update(req, res);
 })
 // end admin 
 //start student  model  techer 
 app.get('/student', (req, res) => {
     if (typeof req.session.user_id == "undefined") {
         res.redirect('/');

     } else if (req.session.level == 2 || req.session.level == 3) {
         c_techer.project_load(req).then((result_data) => {
             res.render('control/admin/techer', {
                 name: req.session.name,
                 last: req.session.lastname,
                 project: result_data,
                 level: req.session.level
             })
         })
     } else {
         res.redirect('/');

     }
 })
 app.post('/student/new', (req, res) => {
     c_techer.project_add(req, res);
 })
 app.post('/student/list/project', (req, res) => {
     c_techer.project_student_insert(req, res);
 })
 app.post('/student/list/load', (req, res) => {
     c_techer.project_student_load(req, res);
 })
 app.post('/student/show/comment',(req,res)=>{
     c_techer.show_comment(req,res);
 })
 app.post('/student/rename/project',(req,res)=>{
     c_techer.project_rename(req,res);
 })
 app.post('/student/update/name',(req,res)=>{
    c_techer.update_name_student(req,res);
 })
 app.post('/student/update/lastname',(req,res)=>{
    c_techer.update_lastname_student(req,res);
 })
 app.post('/student/delete/project',(req,res)=>{
     c_techer.delete_project(req,res);
 })
 // end student model  techer 
 // start group model
 app.get('/group', (req, res) => {
     if (typeof req.session.user_id == "undefined") {
         res.redirect('/');
     } else if (req.session.level != 3) {
         res.redirect('/');
     } else {
         Promise.all([professor.professor_level_load(),group.load(),group.load_group_student()]).then((data) => {
             res.render("control/admin/groups", {
                 name: req.session.name,
                 professor_data: data[0],
                 group:data[1],
                 group_student:data[2],
                 level: req.session.level
             })
         })
     }
 })
 app.post('/group/new',(req,res)=>{
    group.add(req,res);
 })
 app.post('/group/update',(req,res)=>{
     group.update(req,res);
 })
 app.post('/group/random',(req,res)=>{   
    group.randgrouop(req,res);
 })
 app.post('/group/project/update',(req,res)=>{
     group.project_update(req,res);
 })
 // end group model
 //start time model 
 app.get('/time', (req, res) => {
    if (typeof req.session.user_id == "undefined") {
        res.redirect('/');
    } else if (req.session.level != 3) {
        res.redirect('/');
    } else {
        event.load().then((eventtime)=>{
            res.render("control/admin/eventtime", {
                name: req.session.name ,
                event : eventtime,
                level: req.session.level
           })
        })
    }
 })
 app.post('/time/add',(req,res)=>{
    event.add(req,res);
 })
 app.post('/time/edit',(req,res)=>{
     event.edit(req,res);
 })
 app.post('/time/delete',(req,res)=>{
     event.delete(req,res);
 })
 //end time model 
 //comment  start 
 app.get('/comment',(req,res)=>{
    if (typeof req.session.user_id == "undefined") {
        res.redirect('/');
    } else if (req.session.level !=2 ) {
        res.redirect('/');
    } else {
        comment.load(req.session.user_id).then((comment_load)=>{
            res.render("control/admin/committee", {
                name: req.session.name ,
                group_list : comment_load,
                level: req.session.level
           })
        })
    }
 })
 app.post('/comment/event/load',(req,res)=>{
    comment.load_add_comment(req,res);
 })
 app.post('/comment/event/update',(req,res)=>{
     comment.update_add_comment(req,res);
 })
 app.post('/comment/event/show',(req,res)=>{
     comment.show_add_comment(req,res);
 })
 //comment end 

 // edit user
 app.post('/user/load',(req,res)=>{
     res.send({
        name : req.session.name,
        lastname :  req.session.lastname
     })
 })
 app.post('/user/edit',(req,res)=>{
    reg.user_info_update(req,res);
 })
 app.post('/user/reset/password',(req,res)=>{
     reg.resetpassword(req,res);
 })


 //end edit user
 // logout 
 app.get('/logout', (req, res) => {
     req.session.destroy();
     res.redirect('/');
 })
 
 app.listen("3000", (start) => {
     console.log("Server Start 3000");
 });