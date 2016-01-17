(function () {
    var menuItemNumber = $('.skill-item').length,
        angle = 300,
        distance = 180,
        startingAngle = 150 + (-angle / 2),
        slice = angle / (menuItemNumber - 1);

        TweenMax.globalTimeScale(0.8);
        $('.skill-item').each(function (i) {
            var angle = startingAngle + (slice * i);
            $(this).css({
                transform: "rotate("  + angle + "deg)"
            });
            $(this).find('.skill-item-icon').css({
                transform: "rotate(" + (-angle) + "deg)"
            });
        });

        var on = false;

        $('.menu-toggle').mousedown(function () {
            TweenMax.to($('.menu-toggle-icon'), 0.1, {
                scale: 0.65
            });
        });

        $('.menu-toggle').mouseup(function () {
            TweenMax.to($('.menu-toggle-icon'), 0.1, {
                scale: 1
            });
        });

        $(document).on('touchend', function () {
            $(document).trigger('mouseup');
        });

        $('.menu-toggle').on('mousedown', pressHandler);
        $('.menu-toggle').on('touchstart', function (event) {
            $(this).trigger('mousedown');
            event.preventDefault();
            event.stopPropagation();
        });

        function pressHandler(event) {
            on = !on;
            TweenMax.to($(this).children('.menu-toggle-icon'), 0.4, {
                rotation: on ? 360 : 0,
                ease: Quint.easeInOut,
                force3D: true
            });

            on ? openMenu() : closeMenu();
        }

        function openMenu() {
            $('.skill-item').each(function (i) {
                var delay = i * 0.08;

                var $bounce = $(this).children('.skill-item-bounce');

                TweenMax.fromTo($bounce, 0.2, {
                    transformOrigin: "50% 50%"
                }, {
                    delay: delay,
                    scaleX: 0.8,
                    scaleY: 1.2,
                    force3D: true,
                    ease: Quad.easeInout,
                    onComplete: function() {
                        TweenMax.to($bounce, 0.15, {
                            scaleY: 0.7,
                            force3D: true,
                            ease: Quad.easeInOut,
                            onComplete: function() {
                                TweenMax.to($bounce, 3, {
                                    scaleY: 0.8,
                                    force3D: true,
                                    ease: Elastic.easeOut,
                                    easeParams: [1.1, 0.12]
                                })
                            }
                        })
                    }
                });

                TweenMax.to($(this).children('.skill-item__button'), 0.5, {
                    delay: delay,
                    y: distance,
                    force3D: true,
                    ease: Quint.easeInOut
                });
            });
        }

        function closeMenu() {
            $('.skill-item').each(function (i) {
                var delay = i * 0.08;

                var $bounce = $(this).children('.skill-item-bounce');

                TweenMax.fromTo($bounce, 0.2, {
                    transformOrigin: "50% 50%"
                }, {
                    delay: delay,
                    scaleX: 1,
                    scaleY: 0.8,
                    force3D: true,
                    ease: Quad.easeInOut,
                    onComplete: function() {
                        TweenMax.to($bounce, 0.15, {
                            scaleY: 1.2,
                            force3D: true,
                            ease: Quad.easeInOut,
                            onComplete: function() {
                                TweenMax.to($bounce, 3, {
                                    scaleY: 1,
                                    force3D: true,
                                    ease: Elastic.easeOut,
                                    easeParams: [1.1, 0,12]
                                })
                            }
                        })
                    }
                });

                TweenMax.to($(this).children('.skill-item__button'), 0.3, {
                    delay: delay,
                    y: 0,
                    force3D: true,
                    ease: Quint.easeIn
                });
            });
        }
})();
