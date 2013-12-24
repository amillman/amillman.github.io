$(document).ready(function() {


    //menu button reveals menu upon hover
    $("#menu-icon-wrapper, #menu").hover(function() {
        $(".expandable").addClass("on");
    }, function() { //hovering off menu hides it
        $(".expandable").removeClass("on");
    });

    //"View All" prompt appears upon hovering a section block
    var viewButton = '<div class="more-button">View All<span class="inline-icon">&#xf105;</span></div>';
    $(".section-block").hover(function(){ //when user hovers over block

        $(this).append(viewButton);

    }, function() { //when user stops hovering over block
        $(".more-button").fadeOut(200,function(){
            $(this).remove();
        });

    });

    //blocks separate from each other when one is clicked and content appears
    $(".section-block").click(function(){

        var title = $(this).find(".block-header").text();
        _expandBlocks($(this).attr("id"),title);
    });

    //blocks join back together when back button is clicked
    $("#back-button").click(function(){

        _collapseBlocks();
    });

});


_expandBlocks = function(id, title) {

    //make the desired content appear
    $("." + id + "-content").animate({
        opacity:1
    }, 400);

    //make back button appear
    $("#back-button").css("display","inline-block").animate({
        opacity:"1"
    }, 1000);

    //change title name to appropriate name
    $("#title").text(title);

    $("#web-block").animate({
        left: "-51%",
        top:"-51%"
    }, 400, "easeOutCubic");

    $("#android-block").animate({
        right: "-51%",
        top:"-51%"
    }, 400, "easeOutCubic");

    $("#research-block").animate({
        left: "-51%",
        bottom:"-51%"
    }, 400, "easeOutCubic");

    $("#resume-block").animate({
        right: "-51%",
        bottom:"-51%"
    }, 400, "easeOutCubic");



}

_collapseBlocks = function() {

    //change title name back to "Andrew Millman
    $("#title").text("Andrew Millman");

    //make back button disappear
    $("#back-button").animate({
        opacity:"0"
    }, 300, function() {$(this).css("display","none")});

    //hide content
    $(".content-wrapper").animate({
        opacity:0
    }, 400);

    //put section blocks into original position
    $(".section-block").css({left:"",right:"",top:"",bottom:""});
}