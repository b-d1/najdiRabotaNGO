/**
 * Created by Nasi on 11/29/2016.
 */

$(document).ready(function(){

    $(".team-member").hover(function(){
        console.log("gad");
       $(this).find("img").toggleClass("blur");
        $(this).find("div").toggle();
        $(this).toggleClass("animated pulse");
    });

    $("#slickable").slick({
        dots:true,
        centerMode:true,
        slidesToShow:2.2,
        slidesToScroll:1,
        infinite:true,
        autoplay:true,
        autoplaySpeed:2000,
        centerPadding:'60px',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });


});
