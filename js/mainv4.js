/* ========================== CSS VARIABLES ========================== */
var navbarHeight = 52;
var animationTime = 300;
var longAnimationTime = 600;
var springAnimationTime = 550;

/* ============================== CODE =============================== */
var themes = ['blue', 'yellow', 'purple', 'red'];

$(document).ready(function() {
    $('.home-button').addClass(themes[Math.floor(Math.random() * 4)]);
    _adjustHomeCenter();

    $(window).resize(function() {
        _adjustHomeCenter();
    });

    $('.home-button:not(.active):not(.resume)').click(function() {
        $('.home-wrapper').removeClass('active');
        $('.home-button.active').removeClass('active');
        $(this).addClass('active');

        var text = $(this).text();
        setTimeout(function() {
            _populateContent(text);
        }, springAnimationTime + 100);
    });
});

function _adjustHomeCenter() {
    var homeWrapper = $('.home-wrapper');
    if (homeWrapper.hasClass('active')) {
        homeWrapper.css('top', ($('body').height() - homeWrapper.height()) / 2 - 40);
    }
}

function _populateContent(type) {
    var sectionWrapper = $(".section-wrapper");
    if (type != "Resume") {
        $.each(contentInfo[type], function(i, val) {
            sectionWrapper.append(
                '<div class="card ' + (type == "Extra" ? 'extra' : '' ) + '">' +
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
        });
    }
}