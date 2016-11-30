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

            var display = " <p>Место: "+ city +","+ country +"</p>"+
                "<p>Плата: " + salary + "</p>"+
                "<p>Работно време: " + time + "</p>"+
                "<p>Работодавец: " + employer + "</p>"+
                "<p>Опис</p>"+
                "<p>" + description + "</p>"+
                "<p>Потребни документи:</p>"+
                docsNeeded+
                "<p>Дали сте спремни за авантура? <input type='button' value='Аплицирај' class='apply_now'></p>"+
                "<br>"+
                "<hr>";

            //render and break;
            $(".main_page_display_job").append(display);
            return;
        }
    }
}

$(document).ready(function(){
    localStorage.setItem("jobId", "01");
    var jobs = Jobs['jobs'];
    var jobId = localStorage.getItem("jobId");
    render(jobs,jobId);
    console.log(jobs);

    //$(".apply_job").hide();
    $(".apply_now").click(function(){
        $(".main_page_display_job").addClass("blur");
        console.log("clicked");
       $(".apply_job").animate({
           top:"+=1500px"

       },500);
    });

    $(".apply-cancel-button").click(function(){
        $(".main_page_display_job").removeClass("blur");
        $(".apply_job").animate({
            top:"-=1500px"
        },500);
    });

});
