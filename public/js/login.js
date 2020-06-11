$(document).ready(function () {
        $("#login_user").click(function (e) { 
            e.preventDefault();
          const username =   $("#user_login").val();
          const password =   $("#pass_login").val();
          $.post("/student/login", {username:username,password:password},
              function (result) {
                if(result.status == 'error'){
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: result.msg,
                      });
                }else if(result.status == 'login'){
                    location.href = "/"
                }
              },
              "JSON"
          );
        });
    $("#close_reg").click(function (e) {
        e.preventDefault();
        $("#username_reg").val('');
        $("#password_reg").val('');
        $("#email_reg").val('');
        $("#name_reg").val('');
        $("#lastname_reg").val('');
    });
    $("#submit_reg").click(function (e) {
        e.preventDefault();
        const username = $("#username_reg").val();
        const password = $("#password_reg").val();
        const email = $("#email_reg").val();
        const name = $("#name_reg").val();
        const lastname = $("#lastname_reg").val();
        if (username == '' || password == '' || email == '' || name == '' || lastname == '') {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'กรอกข้อมูลให้ครบถ้วน',
            })
        } else if (ValidateEmail(email)) {
            $.post("/student/register", {
                username:username,
                password:password,
                email:email,
                name:name,
                lastname:lastname,
                token:$("#register_form").data("gmail")
            }, (result) => {
                    if (result.status == "error") {
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: result.msg,
                          });
                    } else {
                        $('#register_form').modal('toggle');
                        Swal.fire({
                            icon: 'success',
                            title: 'บันทึกข้อมูลสำเร็จ',
                            text: result.msg,
                          }).then((result) => {
                            if (result.value) {
                            location.href = "/"
                            }
                          })
                          $("#username_reg").val('');
                          $("#password_reg").val('');
                          $("#email_reg").val('');
                          $("#name_reg").val('');
                          $("#lastname_reg").val('');
                         
                    }
                },
                "JSON"
            );

        }
    });
    $("#close_forget").click(function (e) { 
        e.preventDefault();
        $("#username_forget").val('');
        $("#Email_forget").val('');
        
    });
    $("#submit_forget").click(function (e) { 
        e.preventDefault();
        let username = $("#username_forget").val();
        let email = $("#Email_forget").val();
        if(username==''){
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'กรุณากรอกชื่อผู้ใช้'
              });
        }else if(email == ''){
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'กรุณากรอกอีเมล์'
              });
        }else{
            $.post("/user/reset/password", {
                username:username,email:email
            },
                function (result) {
                    if(result.status=="success"){
                        Swal.fire({
                            icon: 'success',
                            title: 'การดำเนินการ',
                            text: result.msg,
                          }).then((result) => {
                            if (result.value) {
                            location.href = "/"
                            }
                          })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: result.msg
                          });
                    }
                },  
                "JSON"
            );
        }
    });
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const token = profile.getId();
      var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect();
    
   
    $.post("/student/google/check", {token:token},
        (result)=> {
            if(result.status =="new-user"){
                $("#register_form").modal('show');
                $("#name_reg").val(profile.getGivenName());
                $("#lastname_reg").val(profile.getFamilyName());
                $("#email_reg").val(profile.getEmail());
                $("#register_form").data("gmail", token);
            }else if(result.status =="login"){
                location.href = "/"
            }else if(result.status =="error"){
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: result.msg
                  }).then((result) => {
                    if (result.value) {
                    location.href = "/"
                    }
                  })
            }
        },
        "JSON"
    );
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'รูปแบบอีเมล์ไม่ถูกต้อง',
    })
    return (false)
}