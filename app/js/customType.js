/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/
"use strict";

var addHighlight = function (elem, highlighted) {
    if (highlighted) {
        elem.css("background", "rgba(255, 255, 255, 0.75)");
    } else {
        elem.css("background", "transparent");
    }
};

$.fn.customTyped = function (attr, delayTime, firstDelay, highlighted) {
    var element = this,
        settings = $.extend({
            strings: ["word1", "word2"],
            firstDelay: firstDelay,
            typingSpeed: 95,
            highlightSpeed: 30,
            delay: delayTime
        }, attr),
        wordIndex = 0,

        typeChar = function (word, i) {
            setTimeout(function () {
                element.append('<span data-id="' + i + '">' + word.charAt(i) + '</span>');
                highlightChar(i);
            }, settings.typingSpeed * i);
        },

        typeWord = function (word) {
            element.html('');
            var i;
            for (i = 0; i < word.length; i += 1) {
                typeChar(word, i);
            }
            setTimeout(function () {
                highlightWord();
            }, settings.typingSpeed * word.length + (settings.delay / 2));
        },

        highlightChar = function (i) {
            setTimeout(function () {
                var char = element.find('span[data-id="' + i + '"]');
                addHighlight(char, highlighted);
            }, settings.highlightSpeed * i);
        },

        highlightWord = function () {
            var word = settings.strings[wordIndex],
                i,
                index = word.length - 1;
            for (i = index; i >= 0; i -= 1) {
                highlightChar(i);
            }
            setTimeout(function () {
                wordIndex += 1;
                typeWords();
            }, settings.highlightSpeed * word.length + settings.delay);
        },

        typeWords = function () {
            if (wordIndex < settings.strings.length) {
                typeWord(settings.strings[wordIndex]);
            }
        };
    element.html('');
    var i;
    for (i = 0; i < settings.strings[wordIndex].length; i += 1) {
        element.append('<span data-id="' + i + '">' + settings.strings[wordIndex].charAt(i) + '</span>');
    }
    setTimeout(function () {
        highlightWord();
    }, settings.firstDelay);
};
