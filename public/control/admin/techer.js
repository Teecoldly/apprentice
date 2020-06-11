$(document).ready(function () {
    $("#professor-table").DataTable({
        "oLanguage": {
            "sEmptyTable": "ไม่มีข้อมูลในตาราง",
            "sInfo": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "sInfoEmpty": "แสดง 0 ถึง 0 จาก 0 แถว",
            "sInfoFiltered": "(กรองข้อมูล _MAX_ ทุกแถว)",
            "sInfoPostFix": "",
            "sInfoThousands": ",",
            "sLengthMenu": "แสดง _MENU_ แถว",
            "sLoadingRecords": "กำลังโหลดข้อมูล...",
            "sProcessing": "กำลังดำเนินการ...",
            "sSearch": "ค้นหา: ",
            "sZeroRecords": "ไม่พบข้อมูล",
            "oPaginate": {
                "sFirst": "หน้าแรก",
                "sPrevious": "ก่อนหน้า",
                "sNext": "ถัดไป",
                "sLast": "หน้าสุดท้าย"
            },
            "oAria": {
                "sSortAscending": ": เปิดใช้งานการเรียงข้อมูลจากน้อยไปมาก"
            }

        }
    });
    $('#test').toast('show')
    $('[data-toggle="tooltip"]').tooltip();
    $("#add_user").click(function (e) {
        e.preventDefault();
        $("#inputnameproject").val('');
    });
    $('#select_student_count').select2();
    $('#select_student_count').on('select2:select', function (e) {
        var data = e.params.data.id;
        if (data == "NULL") {
            $("#student-group").empty();
        } else {
            $("#student-group").empty();
            let table = "";
            for (let i = 1; i <= data; i++) {
                table +=
                    `<div class="form-group">
                     <div class="row">
                         <div class="col-12">
                             <label for="">รหัสนักศึกษา</label>
                             <input type="number" class="form-control"   id="student-id-card-` + i + `" aria-describedby="helpId"
                                 placeholder="รหัสนักศึกษา">
                         </div>
                     </div>
                     <div class="row mt-1">
                         <div class="col-6">
                             <label for="">ชื่อ</label>
                             <input type="text" class="form-control"   id="student-name-` + i + `" aria-describedby="helpId"
                                 placeholder="ชื่อจริง">
                         </div>
                         <div class="col-6">
                             <label for="">นามสกุล</label>
                             <input type="text" class="form-control"   id="student-lastname-` + i + `" aria-describedby="helpId"
                                 placeholder="นามสกุล">
                         </div>
                     </div>
                 </div>
                 <hr class="my-4"`;
            }
            $("#student-group").append(table);



        }
    });
    $("#submit_register_student").click(function (e) {
        e.preventDefault();
        const student_pepole = $('#select_student_count').val();
        if (student_pepole == "NULL") {
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณาเลือกจำนวนนักศึกษา',
            });
        } else {
            let student = {}

            for (let i = 1; i <= student_pepole; i++) {

                if ($("#student-id-card-" + i).val() != "" && $("#student-name-" + i).val() != "" && $("student-lastname-" + i).val() != "") {
                    student[i] = {
                        id_card: $("#student-id-card-" + i).val(),
                        name: $("#student-name-" + i).val(),
                        lastname: $("#student-lastname-" + i).val()
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'การดำเนินการ',
                        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                    });
                    break;

                }
            }
            if (!$.isEmptyObject(student)) {

                student['size'] = student_pepole;
                student['project_id'] = $("#select_student_count").data("project_id");


                $.post("/student/list/project", {
                        data: JSON.stringify(student)
                    },
                    function (resutlt) {
                        if (resutlt.status == "error") {
                            Swal.fire({
                                icon: 'error',
                                title: 'การดำเนินการ',
                                text: resutlt.msg,
                            });
                        } else if (resutlt.status == "success") {
                            Swal.fire({
                                icon: 'success',
                                title: 'การดำเนินการ',
                                text: resutlt.msg
                            }).then((result) => {
                                if (result.value) {
                                    location.href = "/student"
                                }
                            })
                        }
                    },
                    "JSON"
                );
            }






        }

    });
    $("#project_add_sumbit").click(function (e) {
        e.preventDefault();

        const project_name = $('#inputnameproject').val();
        if (project_name == '') {
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณากรอกข้อมูลชื่อโครงการ',
            });
        } else {
            $.post("/student/new", {
                    name_project: project_name
                },
                function (result) {
                    if (result.status == "success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: 'บันทึกข้อมูลสำเร็จ',
                        }).then((result) => {
                            if (result.value) {
                                location.href = "/student"
                            }
                        })
                    }

                },
                "JSON"
            );

        }

    });
    $(document).on('click', '#show_comment_click', function (e) {
        e.preventDefault();
        let project_id = $(this).data("project");
        console.log(project_id);

        $.post("/student/show/comment", {
                project_id: project_id
            },
            function (result) {


                if (result.status == "success") {
                    let tbody = "";
                    let i = 1;
                    $.each(result.data, function (index, value) {
                        let date = new Date(value.date_timestemp)
                        tbody += `<tr>
                         <td class="align-middle">` + (i++) + `</td>
                         <td class="align-middle">` + checkgroup(value.group_id) + `</td>
                         <td class="align-middle">` + value.room + `</td>
                         <td class="align-middle">` + date.getDate().toFixed() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + `</td>
                         <td class="align-middle">` +
                            checknull(value.score)


                            +
                            `</td>
                         <td class="align-middle locksize">` + checknull(value.comment) + `</td>
                         <td class="align-middle ">` + getstatus(value.date_timestemp) + `</td>
                         </tr>`
                    });
                    $("#body_show_event").empty();
                    $("#body_show_event").html(tbody);

                }
            },
            "JSON"
        );
    });
    $(document).on('dblclick', '#nameproject_edit', function (e) {

        e.stopPropagation();
        var currentEle = $(this);
        var value = $(this).html();
        let project_id = $(this).data("id_project");


        updateVal(currentEle, value, project_id);
    });
    $(document).on('click', '#edit_chick', function (e) {
        e.preventDefault();
        let data = $(this).data("project");
        $("#select_student_count").data("project_id", data);
    });
    $(document).on('dblclick', '#rename_user', function (e) {
        
        
        e.stopPropagation();
        var currentEle = $(this);
        var value = $(this).html();
        let student_id = $(this).data("id_student");
    
    
        updateVal_renameuser(currentEle, value, student_id);
    });
    $(document).on('dblclick', '#relastname_user', function (e) {
        
        
        e.stopPropagation();
        var currentEle = $(this);
        var value = $(this).html();
        let student_id = $(this).data("id_student");
    
    
        updateVal_relastnameuser(currentEle, value, student_id);
    });
    $(document).on('click', '#show_student', function (e) {
        e.preventDefault();
        let data = $(this).data("project");
        $.post("/student/list/load", {
                project_id: data
            },
            function (result) {
                let table = "";
                $.each(result.data, function (index, value) {
                    table += ` 
                    <tr>
                        <td class="align-middle">` + value.id_card + `</td>
                        <td class="align-middle font-weight-bolder" id="rename_user"   data-toggle="tooltip" data-placement="right" title="สามารถแก้ไขชื่อนักเรียนโดยดับเบิลคลิก"  data-id_student="` + value.id_card + `" "> ` + value.name + `   </td>
                        <td class="align-middle font-weight-bolder" id="relastname_user"  data-toggle="tooltip" data-placement="right" title="สามารถแก้ไขนามสกุลนักเรียนโดยดับเบิลคลิก"  data-id_student="` + value.id_card + `" >` + value.lastname + `</td>
    
                    </tr>
                    
                    `
                });
                $("#show_details").empty();
                $("#show_details").append(table);
                $('[data-toggle="tooltip"]').tooltip();
            },
            "JSON"
        );
    })
    $(document).on('click', '#delect_group', function (e) {
        e.preventDefault();
   
        
        let id_project = $(this).data("project");
        Swal.fire({
            title: 'แน่ใจที่จำลบกลุ่มโปรเจคนี้?',
            text: "คุณกำลังจะลบกลุ่มโปรเจคนี้ออกจากระบบ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก',
          }).then((result) => {
            if (result.value) {
                $.post("/student/delete/project", {grop_id:id_project},
                    function (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: data.msg,
                        }).then((result) => {
                            if (result.value) {
                                location.href = "/student"
                            }
                        })
                    },
                    "JSON"
                );
                
            }
          })
    });
});

function checkgroup(value) {
    if (value == null) {
        return "ระบบยังไม่สุ่มกรรมการ"
    } else {
        return value
    }
}

function getstatus(diff_number) {
    let datenow = new Date();
    let date = new Date(diff_number);
    let diffdate = date - datenow
    let time = diffdate / 1000;
    if (parseInt(time = time / 60) <= 0) {
        return "<span class='text-success'>การสอบสิ้นสุดลงแล้ว </span>"
    } else if (parseInt(time) >= 0 && parseInt(time) <= 15) {
        return "<span class='text-warning'>การสอบกำลังดำเนินการ </span>"
    } else {
        return "<span class='text-primary'>การสอบรอการดำเนินการ </span>"
    }
}

function checknull(value) {
    if (value == null) {
        return "<span  class = 'text-danger'>กรรมการยังไม่ได้ตัดสิน</span>"
    } else {
        return value
    }

}

function updateVal(currentEle, value, project_id) {
    $(currentEle).html('<input class="form-control" id="rename_project" type="text" value="' + value + '" />');
    $("#rename_project").focus();
    $("#rename_project").keyup(function (event) {
        if (event.keyCode == 13) {
            $.post("/student/rename/project", {
                project_name: $("#rename_project").val().trim(),
                project_id: project_id
            });
            $(currentEle).html($("#rename_project").val().trim());

        }
    });
    $("#rename_project").click(function(event) {
 
        event.stopPropagation();
    });
    $(document).click(function () {

        $.post("/student/rename/project", {
            project_name: $("#rename_project").val().trim(),
            project_id: project_id
        });
        $(currentEle).html($("#rename_project").val().trim());
    });


     


     
}
 

function updateVal_renameuser(currentEle, value, student_id) {
    $(currentEle).html('<input class="form-control" id="rename_user_edit" type="text" value="' + value + '"/>');
    $("#rename_user_edit").focus();
    $("#rename_user_edit").keyup(function (event) {
        if (event.keyCode == 13) {
     
            $.post("/student/update/name", {
                name: $("#rename_user_edit").val().trim(),
                student_id: student_id
            });
            
            $(currentEle).html($("#rename_user_edit").val().trim());
         
  

        }
    });
    $("#rename_user_edit").click(function(event) {
 
        event.stopPropagation();
    });
    $(document).click(function () {
     
        $.post("/student/update/name", {
            
            name: $("#rename_user_edit").val().trim(),
            student_id: student_id
        });
        $(currentEle).html($("#rename_user_edit").val().trim());
 
    });
}


function updateVal_relastnameuser(currentEle, value, student_id) {
    $(currentEle).html('<input class="form-control" id="relastname_user_edit" type="text" value="' + value + '"/>');
    $("#relastname_user_edit").focus();
    $("#relastname_user_edit").keyup(function (event) {
        if (event.keyCode == 13) {
     
            $.post("/student/update/lastname", {
                lastname: $("#relastname_user_edit").val().trim(),
                student_id: student_id
            });
            
            $(currentEle).html($("#relastname_user_edit").val().trim());
         
  

        }
    });
    $("#relastname_user_edit").click(function(event) {
 
        event.stopPropagation();
    });
    $(document).click(function () {
     
        $.post("/student/update/lastname", {
            
            lastname: $("#relastname_user_edit").val().trim(),
            student_id: student_id
        });
        $(currentEle).html($("#relastname_user_edit").val().trim());
 
    });
}