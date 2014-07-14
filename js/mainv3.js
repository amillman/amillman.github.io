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
    populateSection( $(this).text() );
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

function populateSection( title ) {
  var sectionContainer = $(".section-wrapper .content .container");
  sectionContainer.html('');

  $.each( contentInfo[title].projects, function(i, val) {
    sectionContainer.append(
      '<div class="row">' +
        '<div class="col-sm-6">' +
            '<img src="img/' + this.image + '" class="project-picture"/>' +
        '</div>' +
        '<div class="col-sm-6">' +
            '<div class="project-name">' + this.title + '</div>' +
            '<div class="project-slogan">' + this.slogan + '</div>' +
            '<div class="project-description">' + this.description + '</div>' +
            '<a href=' + this.link + ' target="_blank">' +
              '<button class="btn" style="background-color:' + (this.hasOwnProperty('color') ? this.color : '') + ';">' +
                'View ' + (this.abstract ? 'abstract' : this.title )  +
              '</button>' +
            '</a>' +
        '</div>' +
    '</div>'
    );
  });
}