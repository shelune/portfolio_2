$(document).ready(function () {
    var desktopImages = [
        'img/work-3r/bar3r-desk-artist.png',
        'img/work-3r/bar3r-desk-artist.png',
        'img/work-3r/bar3r-desk-artist_item.png',
        'img/work-3r/bar3r-desk-events.png',
        'img/work-3r/bar3r-desk-food.png',
        'img/work-3r/bar3r-desk-form.png'
    ];

    var delayCount = 0;

    (function loopImage () {
        $('#delay-image').fadeOut(300, function () {
            $(this).attr('src', desktopImages[delayCount]);
        })
        .fadeIn(300);
        if (++delayCount < desktopImages.length) {
            setTimeout(loopImage, 2500);
            console.log($('#delay-image'));
        } else {
            delayCount = 0;
        }
    })();
});
