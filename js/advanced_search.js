/**
 * Created by Nasi on 11/29/2016.
 */

var categories = ["Housekeeper","Hostess","Waiter","Electrician","Maintenance","Babysitter","Mechanic"];
var selectedCity = "";
var selectedCategory = "";
var selectedCountry = "";

function loadData(category,selcity){
    $.getJSON( "json/jobs.json", function( data ) {

        $(".search_choose_city").empty();
        $(".search_choose_city").append("<option value='hide'> Изберете град</option>");
        var selectedcountry = $('.advanced_search_input').val();

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
                    selectedCategory = category;
                    selectedCity = selcity
                    if(category==title){
                        console.log("Equal")
                        counter++;
                        //append
                        var appendingDiv =  <!--Results Items-->
                            "<div class='results_item'><a href='showJob?id=" + jobId + "'><h3 class='result_title'>"  + title  + "  <span class='stars'>" + city  + "</span> </h3></a> <hr class='line_divide_jobs'> <p class='description'>" + description  + "</p><br> <input class='apply_button' type='button' value='Аплицирај' tag='" + jobId +  "'> </div>"

                        $(".show_results").append(appendingDiv);
                    }
                    else{
                        $(".error_meesage_not_found").show();
                    }
                }
                else{
                    console.log("0")
                    counter++;
                    //append
                    var appendingDiv =  <!--Results Items-->
                        "<div class='results_item'><a href='showJob?id=" + jobId + "'><h3 class='result_title'>"  + title  + "  <span class='stars'>" + city  + "</span> </h3></a> <hr class='line_divide_jobs'> <p class='description'>" + description  + "</p><br> <input class='apply_button' type='button' value='Аплицирај' tag='" + jobId +  "'> </div>"

                    $(".show_results").append(appendingDiv);
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


        if(counter==0){
            $(".error_meesage_not_found").show();
            $(".error_meesage_not_found").text("Не е пронајдена работа според бараните критериуми!");
        }
        else {
            if (counter == 1) {
                $(".success_message_found").show();
                $(".success_message_found").text("Пронајденa e 1 работа според бараните критериуми!");


            }
            else {
                $(".success_message_found").show();
                $(".success_message_found").text("Пронајдени се " + counter + " работи според бараните критериуми!");
            }
        }
    });
}

function cleanData(){
    $(".error_meesage_not_found").empty();
    $(".success_message_found").empty();
    $(".error_meesage_not_found").hide();
    $(".success_message_found").hide();
    $(".search_choose_city").append("<option value='hide'> Изберете град</option>");
    $(".show_results").empty();
}

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
                cleanData();
                loadData(val,selectedCity);
            }
            else{
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
    loadData(selectedCategory,selectedCity);

    stylingSelect();

    //on click search button
    $(".advanced_search_button").click(function(){
        //$(".select-styled").text("Изберете категорија");
        //stylingSelect()
        cleanData();
        loadData("","");

        stylingSelect();
    });

});