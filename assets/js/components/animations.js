export default class Animations {
    constructor() {
        this.loadFinish = false;
        this.mobileVer = false;
        this.tabletVer = false;
        this.turnOffAnimation = turnOffAnimationOption === "1";
        this.init()
    }

    init() {
        const self = this;
        $(document).ready(function () {
            self.loader();
            self.header();
            self.footer();
            self.singleProduct();
            self.animation();
        });
    }

    loader() {
        const self = this;
        if ($(".loader")[0]) {
            TweenLite.to(".loader", 0.3, {
                delay: 0.25,
                opacity: 0,
                display: "none",
                ease: Power1.easeInOut,
            });
            setTimeout(function () {
                self.loadFinish = true;
            }, 300);
        }
    }

    header() {
        if ($(".yv-elementor-header")[0]) {
            const $body = $("body");
            $body.css("padding-top", $(".yv-elementor-header-container").height());

            // MENU
            let menuTl = new TimelineLite(),
                menuToggle = false,
                $menu = $(".main-menu"),
                menuButtonTl = new TimelineLite(),
                $menuButton = $(".elementor-native-header .el-burger .g__burger, .main-menu .el-burger .g__burger");

            menuTl
                .fromTo($menu, 0.01, {display: "none"}, {display: "block"}, "one")
                .from(
                    $menu.find(".g__background"),
                    0.4,
                    {width: "0%", ease: Power2.easeOut},
                    "one"
                )
                .staggerFrom(
                    $menu.find(".el-account, .el-menu > ul > li, .el-button"),
                    0.6,
                    {delay: 0.2, opacity: 0, y: 20, ease: Power2.easeOut},
                    0.1,
                    "one"
                )

                .from(
                    $menu.find(".part-bottom-bg"),
                    0.4,
                    {width: "0%", delay: 0.5, ease: Power2.easeOut},
                    "one"
                )
                .staggerFrom(
                    $menu.find(".el-text-1, .el-form, .el-socials"),
                    0.6,
                    {delay: 0.6, opacity: 0, y: 20, ease: Power2.easeOut},
                    0.1,
                    "one"
                );
            menuTl.pause();

            menuButtonTl
                .to(
                    $menuButton.find(".g__burger-line-item-outer-1"),
                    0.3,
                    {y: 6.6, ease: Power1.linear},
                    "together"
                )
                .to(
                    $menuButton.find(".g__burger-line-item-outer-2"),
                    0.3,
                    {y: -6.6, ease: Power1.linear},
                    "together"
                )
                .to(
                    $menuButton.find(".g__burger-line-item-outer-1"),
                    0.3,
                    {rotationZ: 45, ease: Power2.easeInOut},
                    "cross"
                )
                .to(
                    $menuButton.find(".g__burger-line-item-outer-2"),
                    0.3,
                    {rotationZ: -45, ease: Power2.easeInOut},
                    "cross"
                );
            menuButtonTl.pause();
            menuButtonTl.timeScale(1);
            $menuButton.click(function () {
                if (!menuToggle) {
                    menuToggle = true;
                    menuButtonTl.timeScale(1);
                    menuButtonTl.play();
                    menuTl.timeScale(1);
                    menuTl.play();

                    $menuButton.addClass("active");
                    $body.addClass("menu-opened");
                    $body.addClass("hide-scroll");
                } else {
                    menuToggle = false;
                    menuButtonTl.timeScale(1.6);
                    menuButtonTl.reverse();
                    menuTl.timeScale(1.6);
                    menuTl.reverse();

                    $menuButton.removeClass("active");
                    $body.removeClass("menu-opened");
                    $body.removeClass("hide-scroll");
                }
            });
            // MENU END
        }
    }

    footer() {
        const $footer = $(".elementor-native-footer");
        if (!$(".elementor-editor-active")[0]) {
            if ($("body").outerHeight(true) < $(window).outerHeight(true)) {
                $footer.addClass("stick-to-bottom");
            }
        }
    }

    singleProduct() {
        if ($("body.single-product")[0]) {
            let $variations = $(".variations"),
                $variationsButtons = $variations.find(".vi-wpvs-option-wrap"),
                regex = /^#([A-F0-9]{3}|[A-F0-9]{6})$/i;
            $variationsButtons.each(function () {
                let colorAttrLabel = $(this).attr("data-attribute_label"),
                    colorAttrValue = $(this).attr("data-attribute_value");

                if (colorAttrLabel.match(regex)) {
                    $(this).css("background", colorAttrLabel);
                    $(this).addClass("yv-variation-color");
                    return;
                }

                if (colorAttrValue.match(regex)) {
                    $(this).css("background", colorAttrValue);
                    $(this).addClass("yv-variation-color");
                }
            });
        }
    }

    animation() {
        // HERO
        let $section = $(".yv-anim-hero"),
            timeLinesArray = [];
        $section.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine
                .fromTo(
                    $(this).find(".yv-anim-hero-1"),
                    0.5,
                    {opacity: 0, y: 15},
                    {opacity: 1, y: 0, ease: Power3.easeOut},
                    "one"
                )
                .fromTo(
                    $(this).find(".yv-anim-hero-2"),
                    0.4,
                    {opacity: 0, y: 15},
                    {delay: 0.1, opacity: 1, y: 0, ease: Power3.easeOut},
                    "one"
                );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($section, timeLinesArray, "70%");
        // HERO END

        // ADV
        $section = $(".yv-anim-adv");
        timeLinesArray = [];
        $section.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine.staggerFromTo(
                $(this).find(".yv-anim-adv-1"),
                0.5,
                {opacity: 0, y: 15},
                {opacity: 1, y: 0, ease: Power3.easeOut},
                0.1,
                "one"
            );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($section, timeLinesArray, "80%");
        // ADV END

        // PRODUCT LIST SALES
        $section = $(".yv-anim-prod-list_1");
        timeLinesArray = [];
        let $item = $section.find(".yv-anim-prod-list_1-3 .e-loop-item");
        $section.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine.fromTo(
                $(this).find(".yv-anim-prod-list_1-1"),
                0.5, {opacity: 0, y: 15}, {opacity: 1, y: 0, ease: Power3.easeOut},
                "one"
            ).fromTo(
                $(this).find(".yv-anim-prod-list_1-2"),
                1.5,
                {width: 0},
                {delay: 0.1, width: "100%", ease: Power2.easeInOut},
                "one"
            );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($section, timeLinesArray, "80%");

        timeLinesArray = [];
        $item.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine.fromTo(
                $(this),
                0.5,
                {opacity: 0, y: 15},
                {opacity: 1, y: 0, ease: Power3.easeOut},
                0.1,
                "one"
            );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($item, timeLinesArray, "80%");
        // PRODUCT LIST SALES END

        // PRODUCT LIST LATEST
        $section = $(".yv-anim-prod-list_2");
        $item = $section.find(".yv-anim-prod-list_2-3 .e-loop-item");
        //---
        timeLinesArray = [];
        $section.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine
                .fromTo(
                    $(this).find(".yv-anim-prod-list_2-1"),
                    0.5,
                    {opacity: 0, y: 15},
                    {opacity: 1, y: 0, ease: Power3.easeOut},
                    "one"
                )
                .fromTo(
                    $(this).find(".yv-anim-prod-list_2-2"),
                    1.5,
                    {width: 0},
                    {delay: 0.1, width: "100%", ease: Power2.easeInOut},
                    "one"
                );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($section, timeLinesArray, "80%");
        // ------
        timeLinesArray = [];
        $item.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine.fromTo(
                $(this),
                0.5,
                {opacity: 0, y: 15},
                {opacity: 1, y: 0, ease: Power3.easeOut},
                0.1,
                "one"
            );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($item, timeLinesArray, "80%");
        // PRODUCT LIST LATEST END

        // DISC
        $section = $(".yv-anim-disc");
        timeLinesArray = [];
        $section.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine.staggerFromTo(
                $(this),
                0.5,
                {opacity: 0, y: 15},
                {opacity: 1, y: 0, ease: Power3.easeOut},
                0.1,
                "one"
            );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($section, timeLinesArray, "80%");
        // DISC END

        // CTA
        $section = $(".yv-anim-cta");
        timeLinesArray = [];
        $section.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine
                .fromTo(
                    $(this),
                    0.5,
                    {opacity: 0, y: 15},
                    {opacity: 1, y: 0, ease: Power3.easeOut},
                    0.1,
                    "one"
                )
                .fromTo(
                    $(this).find(".yv-anim-cta-1"),
                    0.5,
                    {opacity: 0, y: 15},
                    {delay: 0.1, opacity: 1, y: 0, ease: Power3.easeOut},
                    0.1,
                    "one"
                )
                .fromTo(
                    $(this).find(".yv-anim-cta-2"),
                    0.5,
                    {opacity: 0, y: 15},
                    {delay: 0.2, opacity: 1, y: 0, ease: Power3.easeOut},
                    0.1,
                    "one"
                )
                .fromTo(
                    $(this).find(".yv-anim-cta-3").find(".elementor-button-wrapper"),
                    0.5,
                    {opacity: 0, y: 15},
                    {delay: 0.3, opacity: 1, y: 0, ease: Power3.easeOut},
                    0.1,
                    "one"
                );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($section, timeLinesArray, "80%");
        // CTA END

        // SUB
        $section = $(".yv-anim-sub");
        timeLinesArray = [];
        $section.each(function (index) {
            $(this).attr("data-index", index);
            let timeLine = new TimelineLite();
            timeLine.pause();
            timeLine.fromTo(
                $(this),
                0.5,
                {opacity: 0, y: 15},
                {opacity: 1, y: 0, ease: Power3.easeOut},
                0.1,
                "one"
            );
            timeLine.pause();
            timeLinesArray.push(timeLine);
        });
        this.onScrollAnimationPlay($section, timeLinesArray, "80%");
        // SUB END

        // REMOVE REVIEWS
        const pdpReviews = document.querySelector("body.product-template-default .elementor-widget-woocommerce-product-data-tabs");
        if (pdpReviews) {
            pdpReviews.parentNode.parentNode.style = 'left: -999999px; position: absolute';
        }
    }

    executeAnimation($item, timeLinesArray, customOffset) {
        let animationDelay = 1;

        for (let i = 0; i < $item.length; i++) {
            new Waypoint({
                element: $item[i],
                handler(direction) {
                    let index = $(this.element).data("index");
                    if (direction.includes("down")) {
                        setTimeout(function () {
                            timeLinesArray[index].play();
                        }, animationDelay * 100);
                    }

                    animationDelay += 1;
                    setTimeout(function () {
                        animationDelay = 1;
                    }, 30);
                },
                offset: customOffset,
            });

            if (self.turnOffAnimation) {
                timeLinesArray[i].play();
                timeLinesArray[i].timeScale(9999);
            }
        }
    }

    onScrollAnimationPlay($item, timeLinesArray, _customOffset) {
        const self = this;

        let timeBeforeExecutingAnimation = 0,
            customOffset = _customOffset;

        if (customOffset === undefined) {
            customOffset = "95%";
        }

        if (localStorage.getItem("loadFinish") === "true") {
            timeBeforeExecutingAnimation = 10;
        } else {
            timeBeforeExecutingAnimation = 10;
        }

        let loadFinishInterval = setInterval(function () {
            if (self.loadFinish) {
                clearInterval(loadFinishInterval);
                setTimeout(function () {
                    self.executeAnimation($item, timeLinesArray, customOffset);
                }, timeBeforeExecutingAnimation);
            }
        }, 10);

        if (this.tabletVer || this.mobileVer) {
            timeBeforeExecutingAnimation = 0;
        } else {
            timeBeforeExecutingAnimation = 10;
        }
    }
}