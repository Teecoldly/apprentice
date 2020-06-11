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
    $("#project_group").DataTable({
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
    $('#professor_1').select2();
    $('#professor_2').select2();
    $('#professor_3').select2();
    $('#professor_edit_1').select2();
    $('#professor_edit_2').select2();
    $('#professor_edit_3').select2();
    $('#group_edit_select').select2();
    $(document).on('click', '#open_edit_group', function (e) {
        e.preventDefault();
        let group_id = $(this).data("groupid");
        let project_id = $(this).data("project");
        $('#group_edit_select').val(group_id).trigger('change');
        $("#group_edit").data("project_id", project_id);
    })
    $(document).on('click', '#Director_edit_show', function (e) {
        e.preventDefault();
        let dir_1 = $(this).data("dir_1");
        let dir_2 = $(this).data("dir_2");
        let dir_3 = $(this).data("dir_3");
        $("#save_edit_group").data("group_id", $(this).data("groupid"));
        $('#professor_edit_1').val(dir_1).trigger('change');
        $('#professor_edit_2').val(dir_2).trigger('change');
        $('#professor_edit_3').val(dir_3).trigger('change');
    });
    $("#group_edit_save").click(function (e) {
        e.preventDefault();
        let project_id = $("#group_edit").data("project_id");
        $.post("/group/project/update", {
                group_id: $("#group_edit_select").val(),
                project_id: project_id
            },
            function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'การดำเนินการ',
                    text: data.msg
                }).then((result) => {
                    if (result.value) {
                        location.href = "/group"
                    }
                })
            },
            "JSON"
        );


    });
    $("#save_edit_group").click(function (e) {
        e.preventDefault();
        const group_id = $("#save_edit_group").data("group_id");
        const dir_1 = $('#professor_edit_1').val()
        const dir_2 = $('#professor_edit_2').val()
        const dir_3 = $('#professor_edit_3').val()
        $.post("/group/update", {
                dir_1: dir_1,
                dir_2: dir_2,
                dir_3: dir_3,
                group_id: group_id
            },
            function (result) {
                if (result.status == "success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'การดำเนินการ',
                        text: result.msg
                    }).then((status) => {
                        if (status.value) {
                            location.href = "/group"
                        }
                    })
                }
            },
            "JSON"
        );

    });
    $("#radon_group").click(function (e) {
        e.preventDefault();
        console.log(111);

        $.post("/group/random",
            function (result) {
                if (result.status == "success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'การดำเนินการ',
                        text: result.msg
                    }).then((status) => {
                        if (status.value) {
                            location.href = "/group"
                        }
                    })
                }
            },
            "JSON"
        );

    });
    $("#save_group").click(function (e) {
        e.preventDefault();
        $.post("/group/new", {
                pro_1: $("#professor_1").val(),
                pro_2: $("#professor_2").val(),
                pro_3: $("#professor_3").val()
            },
            function (data) {
                if (data.status == "success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'การดำเนินการ',
                        text: data.msg
                    }).then((result) => {
                        if (result.value) {
                            location.href = "/group"
                        }
                    })
                }
            },
            "JSON"
        );
    });
});