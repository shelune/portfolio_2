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
            skillThumbnail = $(this).find(' .skill-item__thumbnail');
        progressTracker.toggleClass('progress-tracker--on');
        if (progressTracker.hasClass('progress-tracker--on')) {
            skillThumbnail.removeClass('pop-up').addClass('pop-away');
        } else {
            skillThumbnail.addClass('pop-up');
        }
    });

    // Inverse Header Navigation activate on scroll

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

    // trigger form overlay - activate

    // trigger form overlay - remove
    $('.close-button').click(function () {
        $('.modal').removeClass('modal--on');
        $('body').removeClass('body--overlay');
    });

    // trigger nav on phone
    $('.nav-toggle').click(function () {
        $('body').toggleClass('top-nav--trigger');
    });

    $('.form__trigger').click(function () {
        $('body').toggleClass('body--overlay');
        $('.modal[data-content="email"]').addClass('modal--on');
    });

    // smooth scrolling on top nav bar
    $('.top-nav li').click(function (e) {
        e.preventDefault();
        var anchorLink = $(this).children().attr('href');
        $('html, body').animate({
            scrollTop: $(anchorLink).offset().top
        }, 700, "easeInOutCirc");
    });

    $('.work').click(function () {
        var dataLink = $(this).attr('data-link');
        window.open(dataLink, '_self');
    });

    $('.top-nav--small a').click(function(e) {
        e.preventDefault();
        var anchorLink = $(this).attr('href');
        console.log(anchorLink);
        setTimeout(function() {
            $('body').removeClass('top-nav--trigger');
            console.log(anchorLink);
        }, 350);
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $(anchorLink).offset().top
            }, 700, "easeInOutCirc");
        }, 500);
    });

    $(document).scroll(function () {
        if ($(window).width() < 500) {
            displayWork('.cyan-3r');
            displayWork('.sharimage');
            displayWork('.october-beatz');
            displayWork('.cssgram');
        }
    });

    function displayWork(className) {
        var classPos = $(className).position().top,
            classHeight = $(className).innerHeight();
        if ($(document).scrollTop() >= classPos - classHeight) {
            $(className).addClass('display-info');
        } else if ($(document).scrollTop() <= classPos / 1.5) {
            $(className).removeClass('display-info');
        }
    }

})();
