$(document).ready(function() {

    var viewButton = '<div class="more-button">View All<span class="inline-icon">&#xf105;</span></div>';

    $(".section-block").hover(function(){ //when user hovers over block

        $(this).append(viewButton);

    }, function() { //when user stops hovering over block
        $(".more-button").fadeOut(200,function(){
            $(this).remove();
        });

    });

});
