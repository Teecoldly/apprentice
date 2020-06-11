$(function () {
    $("#event-table").DataTable({
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
    $("#select_time").flatpickr({
        enableTime: true,
        dateFormat: "d-m-Y H:i",
        minDate: "today",
        maxDate: new Date().fp_incr(30),

    });
    $("#edit_event_time").click(function (e) {
        e.preventDefault();
 
        let event_id = $("#eventtime_edit").data("eventid");
        let details = $("#detail_edit").val();

        if (details == "") {
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณากรอกคำอธิบาย'
            })
        } else if ($("#select_time_edit").val() == "") {
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณาเลือกวันที่'
            })
        } else {
            let detail = $("#detail_edit").val();
            let dateString = $("#select_time_edit").val(),
                dateTimeParts = dateString.split(' '),
                timeParts = dateTimeParts[1].split(':'),
                dateParts = dateTimeParts[0].split('-'),
                date;
            date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
            $.post("/time/edit", {
                    details: detail,
                    timestemp: date.getTime(),
                    event_id: event_id
                },
                function (result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'การดำเนินการ',
                        text: result.msg
                    }).then((status) => {
                        if (status.value) {
                            location.href = "/time"
                        }
                    })
                },
                "JSON"
            );
        }

    });
    $(document).on('click', '#delete_event', function (e) {
        e.preventDefault();
        Swal.fire({
            title: 'แน่ใจที่จำดำเนินการต่อ?',
            text: "ต้องการที่จะลบตารางจองสอบนี้",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ลบ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.value) {
                 $.post("/time/delete", {event_id:$(this).data("eventid")},
                     function (result) {
                        Swal.fire(
                            'การดำเนินการ!',
                             result.msg,
                            'success'
                        ).then((status) => {
                            if (status.value) {
                                location.href = "/time"
                            }
                        }) 
                     },
                     "JSON"
                 );
            }
        })
    });
    $(document).on('click', '#conf-event', function (e) {
        e.preventDefault();
        $("#eventtime_edit").data("eventid", $(this).data("eventid"));
        $("#detail_edit").val($(this).data("details"));
        $("#select_time_edit").flatpickr({
            enableTime: true,
            dateFormat: "d-m-Y H:i",
            minDate: "today",
            maxDate: new Date().fp_incr(30),
            defaultDate: new Date($(this).data("time"))
        });


    })



    $("#save_event_time").click(function (e) {


        e.preventDefault();

        let details = $("#detail_add").val();

        if (details == "") {
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณากรอกคำอธิบาย'
            })
        } else if ($("#select_time").val() == "") {
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณาเลือกวันที่'
            })
        } else {
            var dateString = $("#select_time").val(),
                dateTimeParts = dateString.split(' '),
                timeParts = dateTimeParts[1].split(':'),
                dateParts = dateTimeParts[0].split('-'),
                date;

            date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);


            $.post("/time/add", {
                    detail: details,
                    timetemp: date.getTime()
                },
                function (result) {
                    if (result.status == "Success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: result.msg
                        }).then((status) => {
                            if (status.value) {
                                location.href = "/time"
                            }
                        })
                    }
                },
                "JSON"
            );
        }
    });
    $(document).on('click', '#show_student', function (e) {
        e.preventDefault();
        let data = $(this).data("project");
        $.post("/student/list/load", {project_id:data},
            function (result) {
                let table="";
                $.each(result.data, function (index, value) { 
                    table += ` 
                    <tr>
                        <td>` + value.id_card+`</td>
                        <td>` + value.name+`</td>
                        <td>` + value.lastname+`</td>
    
                    </tr>
                    
                    `
                });
            $("#show_details").empty();
            $("#show_details").append(table);
                
            },
            "JSON"
        );
    })
});