$(document).ready( function() {

  $(".menu-button-wrapper").click(function() {
    var button = $(".menu-button");
    if ( !button.hasClass("open") ) { button.addClass("open").removeClass("normal") }
    else { button.addClass("normal").removeClass("open") }
  })

});