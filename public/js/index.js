$(document).ready(function () {
    $("#event_student").DataTable({
        "oLanguage": {
            "sEmptyTable": "ไม่มีพบตารางการสอบ",
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
    $("#schedule_techer").DataTable({
        "oLanguage": {
            "sEmptyTable": "ไม่มีพบตารางการสอบ",
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
    $("#history_event").DataTable({
        "oLanguage": {
            "sEmptyTable": "ไม่มีพบตารางการสอบ",
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
    $.post("/authen/check",
        function (data) {
            if (data.status == 'error') {
                $("#authen_model").modal({
                    backdrop: 'static',
                    keyboard: false
                })
                $("#authen_model").modal('show')
            }
        },
        "JSON"
    );
    $("#sigout").click(function (e) {
        e.preventDefault();
        location.href = "/logout"
    });
    $("#config").click(function (e) {
        e.preventDefault();
        let id_card = $("#id_card").val();
        if (id_card == "") {
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณากรอกรหัสประจำตัวนักศึกษา'
            })
        } else {
            $.post("/authen/register", {
                    id_card: id_card
                },
                function (result) {
                    if (result.status == "success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: result.msg
                        }).then((status) => {
                            if (status.value) {
                                location.href = "/"
                            }
                        })
                    } else if (result.status == "error") {
                        Swal.fire({
                            icon: 'error',
                            title: 'การดำเนินการ',
                            text: result.msg
                        })
                    }
                },
                "JSON"
            );

        }

    });
    $(document).on('click', '#book_event', function (e) {
        e.preventDefault();
        let text_select = $(this).data("temp_time");
        let event_id = $(this).data("evetid");
        Swal.fire({
            title: 'แน่ใจที่จำดำเนินการต่อ?',
            text: 'คุณแน่ใจจะจองสอบรอบ : '+text_select,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.value) {
             $.post("/event/hold", {event_id:event_id},
                 function (result) {
                    if (result.status == "success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: result.msg
                        }).then((status) => {
                            if (status.value) {
                                location.href = "/"
                            }
                        })
                    } else if (result.status == "error") {
                        Swal.fire({
                            icon: 'error',
                            title: 'การดำเนินการ',
                            text: result.msg
                        })
                    }
                 },
                 "JSON"
             );
            }
        })
    });
});