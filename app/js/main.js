/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/
"use strict";

(function () {
    var typedWords =  $('.typed-words'),
        typedWordsDesc = $('.typed-words--name');
    typedWordsDesc.customTyped({strings: ['', 'Where other men blindly follow the trutH', 'Where other men are limited by morality of laW']}, 1500, 100, false);
    typedWords.customTyped({strings: ['', 'Nothing is truE', 'Everything is permitteD']}, 4000, 1600, true);

    var width, height, landingPage, canvas, ctx, points, target,
        animateHeader = true,
        nearestPointsCount = 5,
        circleColor = 'rgb(111, 5, 5)';

    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y:height/2};

        landingPage = $('#landing-page');
        landingPage.css("height", height + 'px');

        canvas = document.getElementById('canvas--animated');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for (var x = 0; x < width; x += width / 20) {
            for (var y = 0; y < height; y += height / 20) {
                var px = x + Math.random() * width / 20;
                var py = y + Math.random() * height / 20;
                var p = {x: px, originX: px, y: py, originY: py};
                points.push(p);
            }
        }

        // for each point, find the 5 closest points
        for (var i = 0; i < points.length; i += 1) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j += 1) {
                var p2 = points[j];
                if (!(p1 == p2)) {
                    var placed = false;
                    for (var k = 0; k < nearestPointsCount; k += 1) {
                        if (!placed) {
                            if (closest[k] === undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (var k = 0; k < nearestPointsCount; k += 1) {
                        if (!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for (var i in points) {
            var c = new Circle(points[i], 2 + Math.random()*2, circleColor);
            points[i].circle = c;
        }
    }

    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = 0,
            posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) {
            animateHeader = false;
        } else {
            animateHeader = true;
        }
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        landingPage.css("height", height + 'px');
        canvas.width = width;
        canvas.height = height;
    }

    function initAnimation() {
        animate();
        for (var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in points) {

            // detect points in range
                if (Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.4;
                    points[i].circle.active = 0.5;
                } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.1;
                } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.05;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {x: p.originX-50+Math.random()*100, y: p.originY-50+Math.random()*100, ease:Circ.easeInOut, onComplete: function () {
            shiftPoint(p);
        }});
    }

    function drawLines(p) {
        if (!p.active) {
            return;
        }
        for (var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(0, 0, 0,' + p.active + ')';
            ctx.stroke();
        }
    }

    function Circle(pos, rad, color) {
        var _this = this;

        (function () {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if (!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(111, 5, 5,' + _this.active + ')';
            ctx.fill();
        };
    }

    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    // adding class for decoration

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

})();
