/**
 * Created by Nasi on 11/30/2016.
 */


function render(jobs,jobID){

    for(var i=0;i<jobs.length;i++) {
        jobId = jobs[i]['jobId'];
        city = jobs[i]['city'];
        country = jobs[i]['country'];
        description = jobs[i]['description'];
        employer = jobs[i]['employer'];
        salary = jobs[i]['salary'];
        time = jobs[i]['time'];
        title = jobs[i]['title'];
        working_hours = jobs[i]['working_hours'];
        docs = jobs[i]['documents'];

        console.log(docs[1]);
        if(jobId == jobID){

            var docsNeeded = "<ul class='needed-documents'>";
            for(var j=0;j<docs.length;j++){
                docsNeeded += "<li>"+docs[j]['doc']+"</li>";
            }
            docsNeeded+="</ul>";



            var display = "<div class='the_job'><p>Место:  <strong>"+ city +","+ country +"</strong></p>"+
                "<p>Плата: <strong>" + salary + "</strong></p>"+
                "<p>Работно време: <strong>" + time + "</strong></p>"+
                "<p>Работодавец: <strong>" + employer + "</strong></p>"+
                "<p>Опис:</p>"+
                "<p>" + description + "</p>"+
                "<p>Потребни документи:</p>"+
                docsNeeded+
                "<p>Дали сте спремни? <br><br>  <button type='button' class='apply_now'>Аплицирај</button></p>"+
                "<br>"+
                "</div> ";

            //render and break;
            $(".main_page_display_job").append(display);
            $(".text-header-others span").text(title);
            return;
        }
    }
}

$(document).ready(function(){
    $(".success_applied").hide();
    var jobs = Jobs['jobs'];
    var jobId = localStorage.getItem("jobId");
    render(jobs,jobId);

    $(".apply_now").click(function(){
        $(".for-blur").addClass("blur");
        console.log("clicked");
       $(".apply_job").animate({
           top:"+=1600px"
       },500);
    });

    $(".apply-cancel-button").click(function(){
        $(".for-blur").removeClass("blur");
        $(".apply_job").animate({
            top:"-=1600px"
        },500);
    });

    $(".apply-button").click(function(){
        $(".success_applied").show();
        setTimeout(function(){
            window.location.href="./index.html";
        },8000);
    });

});
