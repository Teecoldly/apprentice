$(document).ready(function () {
    $(document).on('change', '#level_professor', function (e) {

        e.preventDefault();
        const user_id = $(this).data("userid");
        const val = $(this).val();
    

        $.post("/professor/updare", {
                user_type: val,
                user_id: user_id
            },
            function (data) {

            },
            "JSON"
        );

    });
    $(document).on('change', '#ban_sataus', function (e) {

        e.preventDefault();
        const user_id = $(this).data("userid");
        let val =  0 ;
        if ($(this).is(":checked")) {
            val = 1 ;
        } else if ($(this).is(":not(:checked)")) {
         val =  0 ; 

        }

        $.post("/professor/ban", {ban_status:val ,ban_id:user_id},
            function (data) {
                
            },
            "JSON"
        );



    });
    $(document).on('click', '#transfer_open_form', function (e) {
        e.preventDefault();
       let user_id =  $(this).data("user_id");
       
        
        $.post("/professor/terfer/load",{user_id:user_id},
            function (result ) {
                $("#transfer_owner").data("owner_student", user_id);
                let option_text = '<option value="NULL">กรุณาเลือก</option>';
              
                
                $.each(result.data, function (index, value) { 
                     option_text+= '<option value="'+ value.user_id+'">ID:'+value.username+' ชื่อ :'+ value.name +' '+value.lastname+'</option>'
                });
                
              $("#id_owner_set").html(option_text);
                
            },
            "JSON"
        );
        $('.js-example-basic-single-2').select2();

    });
    $("#student_terfect_submit").click(function (e) { 
        e.preventDefault();
        let id_set = $("#id_owner_set").val() ;
        if(id_set=="NULL"){
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: "กรุณาเลือก อาจารย์ที่จะโอนย้ายความดูแลนักศึกษาให้",
            });
        }else{
            let owner_student = $("#transfer_owner").data("owner_student");
            $.post("/professor/terfer/update", {
                user_set:id_set,owner:owner_student
            },
                function (result) {
                    if(result.status=="success"){
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: result.msg
                        }).then((result) => {
                            if (result.value) {
                                location.href = "/professor"
                            }
                        })
                    }
                },
                "JSON"
            );
        }
       
        
        
    });
    $('.js-example-basic-single').select2();
    $("#professor_add_sumbit").click(function (e) {
        e.preventDefault();
        const val = $("#professor_add").val();
        if (val == "NULL") {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: "กรุณาเลือก ผู้ใช้ที่จะ เพิ่มเป็นที่ปรึกษา",
            });
        } else {
            $.post("/professor/add", {
                    user_id: val
                },
                function (res) {
                    if (res.status == "success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: "บันทึกข้อมูลสำเร็จ",
                        }).then((result) => {
                            if (result.value) {
                                location.href = "/professor"
                            }
                        })
                    }
                },
                "JSON"
            );
        }
    });
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
});