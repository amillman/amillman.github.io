$(document).ready( function() {

  adjustBgSize();

  $(".menu-button-wrapper").click(function() {
    var menuAndButton = $(".side-menu, .menu-button");
    if ( !menuAndButton.hasClass("open") ) {
      menuAndButton.addClass("open").removeClass("normal");
      $(".transparent-overlay.menu").addClass("menu-open").unbind().click( function () {
        menuAndButton.addClass("normal").removeClass("open");
        $(this).removeClass("menu-open");
      });
    }
    else {
      menuAndButton.addClass("normal").removeClass("open");
      $(".transparent-overlay.menu").removeClass("menu-open");
    }
  });

  $(".home-wrapper .button-wrapper .btn").click( function() {
    $(".section-wrapper, .back-button").addClass("open");
    $(".transparent-overlay.section").addClass("section-open");

    $(".back-button").unbind().click( function() {
      $(".section-wrapper, .back-button").removeClass("open");
      $(".transparent-overlay.section").removeClass("section-open");
    });
  });

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