$(document).ready(function () {
    loadsemester();
    $("#year-edit-open").click(function (e) { 
        e.preventDefault();
        
        $("#year-id").val($("#textsemester").data("year"));
    });
    $("#semester_save").click(function (e) { 
        e.preventDefault();
       updatesemester();
       loadsemester();

    });
});
function loadsemester() { 
    $.post("/semester/load",
        function (data) {
            $("#textsemester").data("year", data.Semester_set);
            $("#textsemester").text(data.Semester_set);
        },
        "JSON"
    );
 }
 function updatesemester() {  
    if($("#year-id").val()==""){
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text:  'กรุณากรอก ปีการศึกษา',
          });
    }else{
        $.post("/semester/update", {semester:$("#year-id").val()},
            function () {
                Swal.fire({
                    icon: 'success',
                    title: 'การดำเนินการ',
                    text: 'บันทึกข้อมูลสำเร็จ',
                  });
            },
            "JSON"
        );
       
    }
 }