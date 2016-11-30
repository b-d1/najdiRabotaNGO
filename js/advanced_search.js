/**
 * Created by Nasi on 11/29/2016.
 */

//======================================//
//=========Jobs Object Declaration======//
//======================================//

var categories = ["Чистачка","Хостеса","Келнер","Електричар","Одржување","Бејбиситер","Механичар"];

var selectedCity = "";
var selectedCategory = "";
var selectedCountry = "";

function check100Words(string){
    var arr = string.split(" ");
    console.log(arr.length);
    if(arr.length>100){
        //prikazi samo sto
        arr = arr.slice(0,100);
        arr = arr.join(" ");
        return arr + " . . . <a href='#'>Прикажи повеќе</a>";
    }
    else{
        return string;
    }
}

//=========================================================//
//=============Function to load data from json=============//
//=========================================================//

function render(jobId,title,city,working_hours,salary,description){
    var appendingDiv = <!--Results Items-->
        "<div class='results_item'>" +
        "<a href='showJob?id=" + jobId + "'>" +
        "<h3 class='result_title'>" + title + " </h3> </a>  <span class='stars'>" + city + "</span> "+
        "<h5>" + salary + "  - " + working_hours + "</h5>"+
        "<hr class='line_divide_jobs'> " +
        "<p class='description'>" + check100Words(description) + "</p><br> " +
        "<input class='apply_button' type='button' value='Аплицирај' tag='" + jobId + "'> </div>";
    return appendingDiv;

}

//
function showMore(){
    return "<div class='show-more'>Прикажи повеќе!</div>"
}




function loadData(category,selcity){

   // $.getJSON( "json/jobs.json", function( data ) {
        var data = Jobs;

        selectedCity = selcity;
        selectedCategory=category;
        console.log(selcity + selectedCategory);

        $(".search_choose_city").empty();
        $(".search_choose_city").append("<option value='hide'> Изберете град</option>");
        var selectedcountry = $('.advanced_search_input').val();

        console.log(selectedcountry);

        var jobs = data['jobs'];
        var cities = [];

        //object attributes
        var jobId,city,country,description,employer,salary,time,title,working_hours;
        var docs;
        var counter = 0;
        for(var i=0;i<jobs.length;i++){
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

            if(selectedcountry==country){
                if(cities.indexOf(city)==-1){
                    cities.push(city);
                    $(".search_choose_city").append("<option value='"+ city +"'>"+ city +"</option>");
                }

                if(category.length!=0){
                    if(category==title) {
                        if (selectedCity.length != 0) {
                            if (selectedCity == city) {
                                console.log("Equal")
                                counter++;
                                //append
                                var appendingDiv = render(jobId,title,city,working_hours,salary,description);

                                $(".show_results").append(appendingDiv);
                            }
                        }
                        else{
                            console.log("Equal")
                            counter++;
                            //append
                            var appendingDiv = render(jobId,title,city,working_hours,salary,description);

                            $(".show_results").append(appendingDiv);
                        }
                    }
                    else{
                        $(".error_meesage_not_found").show();
                    }
                }
                else{
                    if(selectedCity.length !=0 )
                    {
                        if(selectedCity == city) {
                            console.log("We are in");
                            counter++;
                            //append
                            var appendingDiv = render(jobId,title,city,working_hours,salary,description);
                            $(".show_results").append(appendingDiv);
                        }
                    }
                    else{
                        console.log("We are in");
                        counter++;
                        //append
                        var appendingDiv = render(jobId,title,city,working_hours,salary,description);
                        $(".show_results").append(appendingDiv);
                    }
                }
            }
        }

        $(".select-styled").hide();
        $(".select-options").hide();
        stylingSelect();

        if(selectedCategory!=""){
            if(selectedCity!=""){
                $(".search_choose_category").siblings(".select-styled").text(selectedCategory);
                $(".search_choose_city").siblings(".select-styled").text(selectedCity);
            }
            else{
                $(".search_choose_category").siblings(".select-styled").text(selectedCategory);
                $(".search_choose_city").siblings(".select-styled").text("Изберете град");
            }
        }
        else {
            if(selectedCity!=""){
                $(".search_choose_category").siblings(".select-styled").text("Изберете категорија");
                $(".search_choose_city").siblings(".select-styled").text(selectedCity);
            }
            else{
                $(".search_choose_category").siblings(".select-styled").text("Изберете категорија");
                $(".search_choose_city").siblings(".select-styled").text("Изберете град");
            }
        }

        console.log("sgagd");
        if(counter==0){
            $(".error_meesage_not_found").show();
            $(".error_meesage_not_found").text("Не е пронајдена работа според бараните критериуми!");
            //$(".advanced_search_form").addClass("animated shake");
        }
        else {
            if (counter == 1) {
                $(".success_message_found").show();
                $(".success_message_found").html("Пронајденa e <b>1</b> работа според бараните критериуми!");


            }
            else {

                $(".success_message_found").show();
                $(".success_message_found").html("Пронајдени се <b>" + counter + "</b> работи според бараните критериуми!");
            }
        }

}

//=========================================================//
//===========Function to clean all the searched data=======//
//=========================================================//

function cleanData(){
   // $(".advanced_search_form").removeClass("animated shake");
    $(".error_meesage_not_found").empty();
    $(".success_message_found").empty();
    $(".error_meesage_not_found").hide();
    $(".success_message_found").hide();
    $(".search_choose_city").append("<option value='hide'> Изберете град</option>");
    $(".show_results").empty();
}

//=========================================================//
//===========Function for styling the select tags==========//
//=========================================================//

function stylingSelect(){
    //Select styling and transitions
    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');
        $styledSelect.click(function(e) {

            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();

            var val = $this.val();

            if(categories.indexOf(val)!=-1){
                //console.log("11111");
                cleanData();
                loadData(val,selectedCity);
            }
            else{
                //console.log("22222");
                cleanData();
                loadData(selectedCategory,val);
            }
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });
}

$(document).ready(function(){
    $('.advanced_search_input').val("");
    cleanData();
    $(".select-styled").hide();
    $(".select-options").hide();
    loadData(selectedCategory,selectedCity);

    stylingSelect();

    //on click search button
    $(".advanced_search_button").click(function(){
        //stylingSelect()
        cleanData();
        loadData("","");

        stylingSelect();
    });

});