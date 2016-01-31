/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/
"use strict";

(function () {
    // typed words in landing page

    var typedWords =  $('.typed-words'),
        typedWordsDesc = $('.typed-words--name');
    typedWordsDesc.customTyped({strings: ['', 'Where other men blindly follow the trutH', 'Where other men are limited by morality of laW']}, 1500, 100, false);
    typedWords.customTyped({strings: ['', 'Nothing is truE', 'Everything is permitteD']}, 4000, 1600, true);

    // skills menu button functions

    $('.menu-toggle').click(function () {
        var self = this;
        if ($(self).hasClass('menu-toggle-active')) {
            $(self).removeClass('menu-toggle-active');
            setTimeout(function () {
                $(self).find('.menu-toggle-icon').css('opacity', 0);
                $(self).find('.menu-toggle__content').css('opacity', 1);
            }, 350);
        } else {
            $(self).addClass('menu-toggle-active');
            setTimeout(function () {
              $(self).find('.menu-toggle-icon').css('opacity', 1);
              $(self).find('.menu-toggle__content').css('opacity', 0);
            }, 350);
        }
    });

    // display progress tracker percentage

    $('.skill-item__button').hover(function () {
        var progressTracker = $(this).find('.progress-tracker'),
            circleTracker = $(this).find('.circle-tracker'),
            skillThumbnail = $(this).find(' .skill-item__thumbnail');
        progressTracker.toggleClass('progress-tracker--on');
        // circleTracker.toggleClass('circle-tracker--on');
        if (progressTracker.hasClass('progress-tracker--on')) {
            skillThumbnail.removeClass('pop-up').addClass('pop-away');
        } else {
            skillThumbnail.addClass('pop-up');
        }
    });

    // inverse header Navigation

    var windowHeight = window.innerHeight;

    $(window).scroll(function () {
      var currentY = window.pageYOffset || document.documentElement.scrollTop,
          yLimit = windowHeight,
          target = $('.top-nav');
          if (currentY > yLimit) {
            target.addClass('top-nav--inverse');
          } else {
            target.removeClass('top-nav--inverse');
          }
    });

    $('.input__field').focus(function () {
        $(this).closest('.input--custom').addClass('input--filled');
    });

    $('.input__field').blur(function () {
        $(this).closest('.input--custom').removeClass('input--filled');
    });

    $('.modal-box__trigger').click(function (e) {
        e.preventDefault();
        $('.modal').addClass('overlay--triggered');
    });

    $('.close-button').click(function () {
        $('.modal').removeClass('overlay--triggered');
    });

})();
