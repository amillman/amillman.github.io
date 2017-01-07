/* ========================== CSS VARIABLES ========================== */
var navbarHeight = 52;
var animationTime = 300;
var longAnimationTime = 600;
var springAnimationTime = 550;
var modalScrollThreshold = 160;

/* ============================== CODE =============================== */
var themes = ['blue', 'yellow', 'purple', 'red'];
var chosenTheme = themes[0];

$(document).ready(function() {
    chosenTheme = themes[Math.floor(Math.random() * 4)];
    $('.home-button').addClass(chosenTheme);
    _adjustHomeCenter();

    $(window).resize(function() {
        _adjustHomeCenter();
    });

    $('.home-button:not(.resume)').click(_homeButtonHandler);

    $('.modal .content').scroll(_modalScrollHandler);
});

function _adjustHomeCenter() {
    var homeWrapper = $('.home-wrapper');
    if (homeWrapper.hasClass('active')) {
        homeWrapper.css('top', ($('body').height() - homeWrapper.height()) / 2 - 40);
    }
    var underline = $('.home-wrapper .underline');
    if (underline.length) {
        _slideUnderline();
    }
}

function _homeButtonHandler() {
    $('.home-wrapper').removeClass('active');
    $('.home-button.active').removeClass('active');
    $(this).addClass('active');
    $('.home-button').unbind();

    var text = $(this).text();
    _fadeOutCurrentContent();
    setTimeout(function() {
        _populateContent(text);
    }, springAnimationTime + 100);
    _slideUnderline();
}

function _slideUnderline() {
    var underline = $('.home-wrapper .underline');
    var delay = 0;
    if (!underline.length) {
        $('.home-wrapper').append('<div class="underline" style="left:50%;width:0px;opacity:0;"></div>');
        underline = $('.home-wrapper .underline');
        underline.addClass(chosenTheme);
        delay = springAnimationTime;
    }
    var activeSection = $('.home-button.active');
    setTimeout(function() {
        underline.css({
            left: activeSection.position().left,
            width: activeSection.outerWidth(),
            opacity: 1
        });
    }, delay);
}

function _populateContent(type) {
    $("body").append('<div class="section-wrapper"></div>');
    var sectionWrapper = $(".section-wrapper").last();
    var lastIndex = sectionWrapper.children().length;
    if (type != "Resume") {
        $.each(contentInfo[type], function(i, val) {
            sectionWrapper.append(
                '<div class="hidden card ' + (type == "Extra" ? 'extra' : '' ) + '">' +
                    '<div class="cover-photo ' + this.class + '"></div>' +
                    (type != "Extra" ? '<div class="image ' + (this.round ? 'round' : '' ) + '" style="background-image:url(img/' + this.image + ')"></div>' : '') +
                    '<div class="content">' +
                        '<div class="title">' + this.title + '</div>' +
                        '<div class="description">' + this.description + '</div>' +
                    '</div>' +
                    '<div class="actions">' +
                        (this.link ? '<a href="' + this.link + '" target="_blank"><i class="icon ion-link"></i></a>' : '') +
                        '<i class="icon ion-android-more-horizontal"></i>' +
                    '</div>' +
                '</div>'
            );
            setTimeout(function() {
                sectionWrapper.children().eq(i).removeClass("hidden");
            }, i * 100);
        });
        setTimeout(function() {
            $('.home-button:not(.active):not(.resume)').click(_homeButtonHandler);
        }, lastIndex * 100);
    }
}

function _fadeOutCurrentContent() {
    var sectionWrapper = $(".section-wrapper").first();
    var lastIndex = sectionWrapper.children().length;
    if (sectionWrapper) {
        $.each(sectionWrapper.children(), function(i, val) {
            setTimeout(function() {
                $(val).addClass("hidden");
            }, i * 100);
        });
        setTimeout(function() {
            sectionWrapper.remove();
        }, lastIndex * 100);
    }
}

function _modalScrollHandler() {
    var modalContent = $('.modal .content');
    var modalTrueNavbar = $('.modal .navbar .true-elements')
    if (modalContent.scrollTop() < modalScrollThreshold) {
        modalTrueNavbar.addClass('hidden');
    } else {
        modalTrueNavbar.removeClass('hidden');
   }
}