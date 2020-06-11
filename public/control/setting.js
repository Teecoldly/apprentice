$(function () {
    $("#loadsetting_old").click(function (e) { 
        e.preventDefault();
        $.post("/user/load",
            function (data) {
                $("#name_edit_change").val(data.name);
                $("#lastname_edit_chage").val(data.lastname);
                $("#password_edit_change").val();
            },
            "JSON"
        );
        
    });
    $("#submit_edit").click(function (e) { 
        e.preventDefault();
        let new_name =  $("#name_edit_change").val();
        let new_lastname = $("#lastname_edit_chage").val();
        if(new_name == ''){
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณากรอกชื่อ'
            })
        }else if(new_lastname == ''){
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณากรอกนามสกุล'
            })
        }else{
           let password =  $("#password_edit_change").val();
           if(password.length==0){
                $.post("/user/edit", {
                    case_event:0,
                    name :new_name ,
                    lastname :new_lastname
                },
                    function (result) {
                        if(result.status=="success"){
                            Swal.fire({
                                icon: 'success',
                                title: 'การดำเนินการ',
                                text: result.msg
                            }).then((status) => {
                                if (status.value) {
                                    location.reload();
                                }
                            })
                        }else if(result.status=="error"){
                            Swal.fire({
                                icon: 'error',
                                title: 'การดำเนินการ',
                                text: result.msg
                            }).then((status) => {
                                if (status.value) {
                                    location.reload();
                                }
                            })
                        }
                    
                    },
                    "JSON"
                );
           }else if(password.length<=8){
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณากรอกรหัสผ่านให้ยาวมากกว่า 8 ตัวอักษร'
            })
           }else{
                $.post("/user/edit", {
                    case_event:1,
                    name :new_name ,
                    lastname :new_lastname,
                    password: password
                },
                function (result) {
                    if(result.status=="success"){
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: result.msg
                        }).then((status) => {
                            if (status.value) {
                                location.reload();
                            }
                        })
                    }else if(result.status=="error"){
                        Swal.fire({
                            icon: 'error',
                            title: 'การดำเนินการ',
                            text: result.msg
                        }).then((status) => {
                            if (status.value) {
                                location.reload();
                            }
                        })
                    }
                
                },
                    "JSON"
                );
           }
        }

    });
});