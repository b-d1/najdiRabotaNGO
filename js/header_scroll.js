/**
 * Created by Blagoj on 12/1/2016.
 */
$(window).on("scroll", function() {
    if($(window).scrollTop() > 800) {
        $("nav").addClass("colored");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
        $("nav").removeClass("colored");
    }
});