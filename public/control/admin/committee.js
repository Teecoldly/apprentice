$(document).ready(function () {
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
    $(document).on('click', '#comment_add_click ', function (e) {
        e.preventDefault();
 
        let project_id = $(this).data("project_id");
        $("#add_score").val(0);
        $("textarea#add_comment_text").val('');
        $.post("/comment/event/load", {project_id:project_id},
            function (result) {
                if(result.status=="success"){
                    let text ='<option value="NULL">กรุณาเลือก</option>';
                   $.each(result.data, function (index, value) {
                    let date = new Date(value.date_timestemp) 
                    if(getstatus(value.date_timestemp)==3){
                        text+=  ` <option value="`+value.event_id +`">`+ date.getDate().toFixed()+"-"+ date.getMonth().toFixed()+"-"+date.getFullYear()+" "+  (date.getHours()<10?'0':'') + date.getHours()  +':'+(date.getMinutes()<10?'0':'') + date.getMinutes() +`</option>`
                  
                    }
                    });
                   $("#comment_event_list").empty();
                   $("#comment_event_list").html(text);
                   $("#comment_event_list").select2();
                }
            },
            "JSON"
        );
    });
    $(document).on('click', '#show_event_comment_add ', function (e) {
        e.preventDefault();
        let project_id = $(this).data("project_id");
        $.post("/comment/event/show", {project_id:project_id},
            function (result) {
                if(result.status=="success"){
                    let tbody="";
                    let i =1 ; 
                    $.each(result.data, function (index, value) { 
                        let date = new Date(value.date_timestemp) 
                         tbody +=`<tr>
                         <td class="align-middle">`+ (i++ )+`</td>
                         <td class="align-middle">`+ date.getDate().toFixed()+"-"+ date.getMonth().toFixed()+"-"+date.getFullYear()+" "+  (date.getHours()<10?'0':'') + date.getHours()  +':'+(date.getMinutes()<10?'0':'') + date.getMinutes() +`</td>
                         <td class="align-middle">`+value.score+`</td>
                         <td class="align-middle locksize">`+value.comment+`</td>
                         </tr>`
                    });
                    $("#body_show_event").empty();
                    $("#body_show_event").html(tbody);
                
                }
            },
            "JSON"
        );
    });
    $("#submit_comment").click(function (e) { 
        e.preventDefault();
        let get_event =  $("#comment_event_list").val();
        let get_score = $("#add_score").val();
        let get_textarea = $("textarea#add_comment_text").val();
        if(get_event=="NULL"){
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณาเลือกวัดการสอบข้อการส่งคะแนน'
            })
        }else if(get_score==''){
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณาใส่คะแนนสอบ'
            })
        }else if(get_textarea==''){
            Swal.fire({
                icon: 'error',
                title: 'การดำเนินการ',
                text: 'กรุณากรอกคอมเม้น'
            })
        }else{
            $.post("/comment/event/update", {
                score : get_score,
                comment:get_textarea,
                event_id :get_event
            },
                function (result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'การดำเนินการ',
                        text: result.msg
                    }).then((status) => {
                        if (status.value) {
                            location.href = "/comment"
                        }
                    })
                    
                },
                "JSON"
            );
        }
        
    });
});
 
function getstatus(diff_number) {
    let datenow  = new Date();
    let date  = new Date(diff_number);
    let diffdate  =date - datenow  
    let time= diffdate/1000;
    if( parseInt(time=time/60)<=0){
        return 3
    }else if (parseInt(time)>=0 && parseInt(time)<=15){
        return 2
    } else {
        return 1
    }
}