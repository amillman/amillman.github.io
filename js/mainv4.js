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
    _enableNightMode();

    chosenTheme = themes[Math.floor(Math.random() * 4)];
    $('.home-button').addClass(chosenTheme);
    _adjustHomeCenter();

    $(window).resize(function() {
        _adjustHomeCenter();
    });

    $('.home-button:not(.resume)').click(_homeButtonHandler);

    $('.dropdown-icon, .dropdown-overlay').click(_dropdownHandler);
});

function _enableNightMode() {
    var now = new Date();
    if (now.getHours() >= 18) {
        $('body').addClass('night');
    }

    $('.night-mode-toggler').click(function() {
        $('body').toggleClass('night');
    });
}

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

function _dropdownHandler() {
    $('.dropdown-icon').toggleClass('active');
    var dropdown = $('.dropdown');
    if (!dropdown.hasClass('hidden')) {
        setTimeout(function(){ dropdown.addClass('no-display')}, springAnimationTime);
    } else {
        dropdown.removeClass('no-display');
    }
    setTimeout(function(){ dropdown.toggleClass('hidden')}, 50);
    $('.dropdown-overlay').toggleClass('hidden');
}

function _populateContent(type) {
    $("body").append('<div class="section-wrapper"></div>');
    var sectionWrapper = $(".section-wrapper").last();
    var lastIndex = sectionWrapper.children().length;
    if (type != "Resume") {
        $.each(contentInfo[type], function(i, val) {
            var dataJSON = this;
            sectionWrapper.append(
                '<div class="hidden card ' + (type == "Extra" ? 'extra' : '' ) + '">' +
                    '<div class="cover-photo ' + dataJSON.class + '"></div>' +
                    (type != "Extra" ? '<div class="image ' + (dataJSON.round ? 'round' : '' ) + '" style="background-image:url(img/' + dataJSON.image + ')"></div>' : '') +
                    '<div class="content">' +
                        '<div class="title">' + dataJSON.title + '</div>' +
                        '<div class="description">' + dataJSON.description + '</div>' +
                    '</div>' +
                    '<div class="actions">' +
                        (dataJSON.link ? '<a href="' + dataJSON.link + '" target="_blank"><i class="icon ion-link"></i></a>' : '') +
                        '<i class="icon ion-android-more-horizontal modal-open"></i>' +
                    '</div>' +
                '</div>'
            );
            setTimeout(function() {
                var newCard = sectionWrapper.children().eq(i);
                newCard.removeClass("hidden");
                newCard.find('.modal-open').data('contentType', type);
                newCard.find('.modal-open').data('title', dataJSON.title);
            }, i * 100);
        });
        $('.card .actions .modal-open').click(function() {
            var type = $(this).data('contentType');
            var title = $(this).data('title');
            var dataJSON = null;
            $.each(contentInfo[type], function(i, val) {
                if (this.title == title) {
                    dataJSON = this;
                    return false;
                }
            });
            console.log(dataJSON);
            _showModal(dataJSON);
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

function _showModal(dataJSON) {
    $('body').append(_generateModalHTML(dataJSON));
    var modalWrapper = $('.modal-wrapper');
    setTimeout(function() {
        modalWrapper.removeClass('hidden');
    }, 50);
    
    $('.modal .content').scroll(_modalScrollHandler);
    $('.modal-background, .modal .modal-close').click( function() {
        modalWrapper.addClass('hidden');
        setTimeout(function() {
            modalWrapper.remove();
        }, longAnimationTime);
    });
}

function _generateModalHTML(dataJSON) {
    return '<div class="modal-wrapper hidden">' +
        '<div class="modal-background"></div>' +
        '<div class="modal">' +
            '<div class="navbar">' +
                '<div class="pseudo-elements">' +
                    (dataJSON.link ? '<a href="' + dataJSON.link + '" target="_blank"><i class="modal-link icon ion-link"></i></a>' : '') +
                    '<i class="modal-close icon ion-close-round"></i>' +
                '</div>' +
                '<div class="true-elements hidden ' + dataJSON.class + '">' +
                    (dataJSON.link ? '<a href="' + dataJSON.link + '" target="_blank"><i class="modal-link icon ion-link"></i></a>' : '') +
                    '<div class="modal-title">' + dataJSON.title + '</div>' +
                    '<i class="modal-close icon ion-close-round"></i>' +
                '</div>' +
            '</div>' +
            '<div class="content">' +
                '<div class="header">' +
                    '<div class="image ' + (dataJSON.round ? 'round' : '' ) + '" style="background-image:url(img/' + dataJSON.image + ')"></div>' +
                    '<div class="title-wrapper">' +
                        '<div class="title">' + dataJSON.title + '</div>' +
                        '<div class="slogan">' + dataJSON.slogan + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="description">' + dataJSON.description + '</div>' +
                (dataJSON.pictures ? '<div class="bottom-image" ' + (dataJSON.pictures ? 'style="background-image:url(img/' + dataJSON.pictures + ')"' : '') + '></div>' : '') +
            '</div>' +
        '</div>' +
    '</div>';
}