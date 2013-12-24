$(document).ready(function() {

    var viewButton = '<div class="more-button">View All<span class="inline-icon">&#xf105;</span></div>';

    $(".section-block").hover(function(){ //when user hovers over block

        $(this).append(viewButton);

    }, function() { //when user stops hovering over block
        $(".more-button").fadeOut(200,function(){
            $(this).remove();
        });

    });

    $(".section-block").click(function(){

        _expandBlocks("yes");

    });

});


_expandBlocks = function(id) {

    $("." + id + "-content").fadeIn(200);

    $("#web-block").animate({
        left: "-51%",
        top:"-51%"
    }, 400);

    $("#android-block").animate({
        right: "-51%",
        top:"-51%"
    }, 400);

    $("#research-block").animate({
        left: "-51%",
        bottom:"-51%"
    }, 400);

    $("#resume-block").animate({
        right: "-51%",
        bottom:"-51%"
    }, 400);

    $(".menu-icon-line").css("background-color","#555555");
    $("#andrew-info").css("color","#555555");

}