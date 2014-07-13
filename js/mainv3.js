$(document).ready( function() {

  adjustBgSize();

  $(".menu-button-wrapper").click(function() {
    var menuAndButton = $(".side-menu, .menu-button");
    if ( !menuAndButton.hasClass("open") ) { menuAndButton.addClass("open").removeClass("normal") }
    else { menuAndButton.addClass("normal").removeClass("open") }
  })

  $(window).resize(function() {
    adjustBgSize();
  });

});

function adjustBgSize() {

  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  $(".bg-blur").width(windowWidth); //adjust size of the blur backgrounds
  if ( windowWidth < 1.60 * windowHeight ) {
    $("html, .bg-blur").css("background-size", "auto 100%");
  } else {
    $("html, .bg-blur").css("background-size", "100% auto");
  }
}