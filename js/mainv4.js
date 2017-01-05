/* ========================== CSS VARIABLES ========================== */
var navbarHeight = 52;
var animationTime = 300;
var longAnimationTime = 600;

/* ============================== CODE =============================== */
var themes = ['blue', 'yellow', 'purple', 'red'];

$(document).ready(function() {
    $('.home-button').addClass(themes[Math.floor(Math.random() * 4)]);
    _adjustHomeCenter();

    $(window).resize(function() {
        _adjustHomeCenter();
    });

    $('.home-button:not(.active)').click(function() {
        //_animateToContentMode();
        $('.home-wrapper').removeClass('active');
        $('.home-button.active').removeClass('active');
        $(this).addClass('active');
    });
});

function _adjustHomeCenter() {
    var homeWrapper = $('.home-wrapper');
    if (homeWrapper.hasClass('active')) {
        homeWrapper.css('top', ($('body').height() - homeWrapper.height()) / 2 - 40);
    }
}

// function _animateToContentMode() {
//     var homeWrapper = $('.home-wrapper');
//     var navVerticalMargin = (navbarHeight - $('.home-button').height()) / 2;
//     console.log(navVerticalMargin);
//     if (homeWrapper.hasClass('active')) {
//         homeWrapper.animate({
//             top: -homeWrapper.height() - navVerticalMargin
//         }, springAnimationTime, $.bez(springCurve));
//     }
// }