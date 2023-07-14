var loadFinish = false,
    mobileVer = false,
    tabletVer = false,
    turnOffAnimation = false;

if (turnOffAnimationOption == "1") {
    turnOffAnimation = true;
}

var template = {
    init: function () {
        self = this;

        $(document).ready(function () {
            self.loader();
            self.header();
            self.singleProduct();
            self.checkout();

            self.animation();
        });
    },
    loader: function () {
        if ($(".loader")[0]) {
            TweenLite.to(".loader", 0.3, {
                delay: 0.25,
                opacity: 0,
                display: "none",
                ease: Power1.easeInOut,
            });

            var peloaderTimer = setTimeout(function () {
                onLoadFinish();
            }, 300);

            function onLoadFinish() {
                loadFinish = true;
            }
        }
    },
    header: function () {
        if ($(".yv-elementor-header")[0]) {
            // if not at top
            // var scrollOffset = -1;

            // var fixedHeaderW = new Waypoint({
            //  	element: $('body'),
            //  	handler: function(direction) {
            //  		if (direction == 'down') {
            //  			TweenMax.to($('.yv-elementor-header'), 0.3, {ease:Power0.linear, marginTop:-$('.yv-elementor-header').position().top});
            //  		} else {
            //  			TweenMax.to($('.yv-elementor-header'), 0.3, {ease:Power0.linear, marginTop:0});
            //  		}
            //  	},
            //  	offset: scrollOffset
            // });
            // if not at top end

            $("body").css(
                "padding-top",
                $(".yv-elementor-header-container").height()
            );
            // $('.elementor-native-header').css('top', -$('.yv-elementor-header').height());
            // $('.elementor-native-header').css('position', 'relative');

            // MENU
            var $body = $("body"),
                menuTl = new TimelineLite(),
                menuToggle = false;
            $menu = $(".main-menu");

            var menuButtonTl = new TimelineLite(),
                $menuButton = $(
                    ".elementor-native-header .el-burger .g__burger, .main-menu .el-burger .g__burger"
                );

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
                if (menuToggle == false) {
                    menuToggle = true;
                    menuButtonTl.timeScale(1);
                    menuButtonTl.play();
                    menuTl.timeScale(1);
                    menuTl.play();

                    $menuButton.addClass("active");
                    $body.addClass("menu-opened");
                    $("body").addClass("hide-scroll");
                } else {
                    menuToggle = false;
                    menuButtonTl.timeScale(1.6);
                    menuButtonTl.reverse();
                    menuTl.timeScale(1.6);
                    menuTl.reverse();

                    $menuButton.removeClass("active");
                    $body.removeClass("menu-opened");
                    $("body").removeClass("hide-scroll");
                }
            });
            // MENU END
        }
    },
    singleProduct: function () {
        if ($("body.single-product")[0]) {
            var $variations = $(".variations");
            $variationsButtons = $variations.find(".vi-wpvs-option-wrap");

            var regex = /^#([A-F0-9]{3}|[A-F0-9]{6})$/i;

            $variationsButtons.each(function () {
                var colorAttrLabel = $(this).attr("data-attribute_label"),
                    colorAttrValue = $(this).attr("data-attribute_value");

                if (colorAttrLabel.match(regex)) {
                    $(this).css("background", colorAttrLabel);
                    $(this).addClass("yv-variation-color");

                    return;
                }

                if (colorAttrValue.match(regex)) {
                    $(this).css("background", colorAttrValue);
                    $(this).addClass("yv-variation-color");

                    return;
                }
            });
        }
    },
    checkout: function () {
        if ($("body.woocommerce-checkout")[0]) {
        }
    },
    animation: function () {
        // HERO
        var $section = $(".yv-anim-hero");

        var timeLinesArray = [];

        $section.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

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

        onScrollAnimationPlay($section, timeLinesArray, "70%");
        // HERO END

        // ADV
        var $section = $(".yv-anim-adv");

        var timeLinesArray = [];

        $section.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

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

        onScrollAnimationPlay($section, timeLinesArray, "80%");
        // ADV END

        // PRODUCT LIST SALES
        var $section = $(".yv-anim-prod-list_1"),
            $item = $section.find(".yv-anim-prod-list_1-3 .e-loop-item");

        var timeLinesArray = [];

        $section.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

            timeLine.pause();
            timeLine
                .fromTo(
                    $(this).find(".yv-anim-prod-list_1-1"),
                    0.5,
                    {opacity: 0, y: 15},
                    {opacity: 1, y: 0, ease: Power3.easeOut},
                    "one"
                )
                .fromTo(
                    $(this).find(".yv-anim-prod-list_1-2"),
                    1.5,
                    {width: 0},
                    {delay: 0.1, width: "100%", ease: Power2.easeInOut},
                    "one"
                );

            timeLine.pause();
            timeLinesArray.push(timeLine);
        });

        onScrollAnimationPlay($section, timeLinesArray, "80%");

        var timeLinesArray = [];

        $item.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

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

        onScrollAnimationPlay($item, timeLinesArray, "80%");
        // PRODUCT LIST SALES END

        // PRODUCT LIST LATEST
        var $section = $(".yv-anim-prod-list_2"),
            $item = $section.find(".yv-anim-prod-list_2-3 .e-loop-item");

        var timeLinesArray = [];

        $section.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

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

        onScrollAnimationPlay($section, timeLinesArray, "80%");

        var timeLinesArray = [];

        $item.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

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

        onScrollAnimationPlay($item, timeLinesArray, "80%");
        // PRODUCT LIST LATEST END

        // DISC
        var $section = $(".yv-anim-disc");

        var timeLinesArray = [];

        $section.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

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

        onScrollAnimationPlay($section, timeLinesArray, "80%");
        // DISC END

        // CTA
        var $section = $(".yv-anim-cta");

        var timeLinesArray = [];

        $section.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

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

        onScrollAnimationPlay($section, timeLinesArray, "80%");
        // CTA END

        // SUB
        var $section = $(".yv-anim-sub");

        var timeLinesArray = [];

        $section.each(function (index) {
            $(this).attr("data-index", index);

            var timeLine = new TimelineLite();

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

        onScrollAnimationPlay($section, timeLinesArray, "80%");
        // SUB END
    },
};

template.init();

function onScrollAnimationPlay($item, timeLinesArray, _customOffset) {
    var timeBeforeExecutingAnimation = 0,
        customOffset = _customOffset;

    if (customOffset === undefined) {
        customOffset = "95%";
    }

    if (localStorage.getItem("loadFinish") == "true") {
        timeBeforeExecutingAnimation = 10;
    } else {
        timeBeforeExecutingAnimation = 10;
    }

    var loadFinishInterval = setInterval(function () {
        if (loadFinish == true) {
            clearInterval(loadFinishInterval);

            setTimeout(function () {
                executeAnimation();
            }, timeBeforeExecutingAnimation);
        }
    }, 10);

    if (tabletVer == true || mobileVer == true) {
        timeBeforeExecutingAnimation = 0;
    } else {
        timeBeforeExecutingAnimation = 10;
    }

    function executeAnimation() {
        var animationDelay = 1;

        for (var i = 0; i < $item.length; i++) {
            new Waypoint({
                element: $item[i],
                handler: function (direction) {
                    var index = $(this.element).data("index");

                    if (direction == "down") {
                        setTimeout(function () {
                            timeLinesArray[index].play();
                        }, animationDelay * 100);
                    } else {
                    }

                    animationDelay += 1;

                    setTimeout(function () {
                        animationDelay = 1;
                    }, 30);
                },
                offset: customOffset,
            });

            if (turnOffAnimation == true) {
                timeLinesArray[i].play();
                timeLinesArray[i].timeScale(9999);
            }
        }
    }
}

// CUSTOM CHECKOUT
if (
    $("body.woocommerce-checkout")[0] &&
    $(".type-custom-checkout")[0] &&
    !$(".woocommerce-order-received")[0]
) {
    $(".yv-header-nav, .yv-header-search, .yv-header-cart").hide();
    $("footer").hide();

    // fill custom fields based on original
    setTimeout(function () {
        $yvName.val($("#billing_first_name").val());
        $("#billing_first_name").val($yvName.val());
        $("#shipping_first_name").val($yvName.val());
        $yvEmail.val($("#billing_email").val());
        $yvTel.val($("#billing_phone").val());

        if ($("#shipping_country").attr("type") == "hidden") {
            $yvShippingPais.val(
                $("#shipping_country_field")
                    .find(".woocommerce-input-wrapper strong")
                    .text()
            );
        } else {
            $yvShippingPais.replaceWith(
                '<select id="' + $yvShippingPais.attr("id") + '">'
            );
            $yvShippingPais = $("#yv_billing_pais");

            bindChangeOnPais();

            $yvShippingPais.html("");

            $("#shipping_country option").each(function () {
                $yvShippingPais.append($(this).clone());
            });

            if ($("#shipping_country").val() != "") {
                $yvShippingPais.val($("#shipping_country").val());
            } else {
                $yvShippingPais.find("option").eq(0).attr("selected", "selected");
            }
        }

        $yvShippingDistrito.val($("#shipping_address_1").val());
        $yvShippingPostal.val($("#shipping_postcode").val());
        $yvShippingExacta.val($("#shipping_exact_direction").val());

        // shipping state
        $("#shipping_state option").each(function () {
            $yvShippingProvincia.append($(this).clone());
        });

        if ($("#shipping_state").val() != "") {
            $yvShippingProvincia.val($("#shipping_state").val());
        } else {
            $yvShippingProvincia.find("option").eq(0).attr("selected", "selected");
        }
        // shipping state end

        // shipping town select
        setTimeout(function () {
            changeTagForCanton();

            $yvShippingCanton.html("");

            $("#shipping_city option").each(function () {
                $yvShippingCanton.append($(this).clone());
            });

            if ($("#shipping_city").val() != "") {
                $yvShippingCanton.val($("#shipping_city").val());
            } else {
                $yvShippingCanton.find("option").eq(0).attr("selected", "selected");
            }
        }, 2000);
        // shipping town end
    }, 100);

    // fill custom fields based on original end

    function appendMap() {
        var $mapOrig = $("#lpac-map-container"),
            $mapPlace = $(".step-content-map-container");

        $mapPlace.append($mapOrig);
    }

    if ($("#lpac-map-container")[0]) {
        appendMap();
    } else {
        $(".step-content-map").hide();
    }

    var $step = $(".step-content-item"),
        $stepTab = $("section.type-custom-checkout .step-item");

    $step.eq(0).addClass("active");
    $stepTab.eq(0).addClass("active");

    var stepTwoIsOpen = false,
        stepThreeIsOpen = false;

    var differentBillingAddress = false;

    var localPickUp = false;

    $stepTab.on("click", function () {
        if ($(this).hasClass("active")) {
            $step.removeClass("active");
            $step.eq($(this).index()).addClass("active");

            $(this).nextAll(".step-item").removeClass("active");
            $(this).nextAll(".step-item").removeClass("completed");
            $(this).removeClass("completed active");
            $(this).addClass("active");
        }
    });

    // STEP 1
    var $yvName = $("#yv_billing_name"),
        $yvEmail = $("#yv_billing_email"),
        $yvTel = $("#yv_billing_tel");

    var $yvToSecondStepButton = $("#yv_to_second_step_button");

    function checkIfCanOpenSecondStep() {
        if ($yvName.val() != "" && $yvEmail.val() != "" && $yvTel.val() != "") {
            stepTwoIsOpen = true;
            $yvToSecondStepButton.removeClass("var-disabled");
        } else {
            stepTwoIsOpen = false;
            $yvToSecondStepButton.addClass("var-disabled");
        }
    }

    setTimeout(function () {
        checkIfCanOpenSecondStep();
    }, 200);

    $yvName.bind("input propertychange", function () {
        $("#billing_first_name").val($yvName.val());
        $("#shipping_first_name").val($yvName.val());

        checkIfCanOpenSecondStep();
    });

    $yvEmail.bind("input propertychange", function () {
        $("#billing_email").val($yvEmail.val());

        checkIfCanOpenSecondStep();
    });

    $yvTel.bind("input propertychange", function () {
        $("#billing_phone").val($yvTel.val());

        checkIfCanOpenSecondStep();
    });

    $yvToSecondStepButton.on("click", function () {
        $step.removeClass("active");

        $step.eq(1).addClass("active");

        $stepTab.eq(0).addClass("completed");
        $stepTab.eq(1).addClass("active");
    });
    // STEP 1 END

    // STEP 2
    var $yvShippingPais = $("#yv_billing_pais"),
        $yvShippingProvincia = $("#yv_billing_provincia"),
        $yvShippingCanton = $("#yv_billing_canton");
    $yvShippingDistrito = $("#yv_billing_distrito");
    $yvShippingPostal = $("#yv_billing_postal");
    $yvShippingExacta = $("#yv_billing_exacta");

    var $yvToThirdStepButton = $("#yv_to_third_step_button");

    var $shippingOrPick = $("#yv_shipping_or_pick");

    var mapClicked = false;

    $(".step-content-shipping-method-content-item-2").hide();

    if (hideLocalPickUp === true) {
        $(".step-content-shipping-method-item").eq(1).hide();
    }

    function checkIfCanOpenThirdStep(updateShipping) {
        stepThreeIsOpen = false;

        $yvToThirdStepButton.addClass("var-disabled");

        if (mapClicked == true) {
            if (updateShipping == undefined || updateShipping != false) {
                updateShippingMethods();
            }
        }

        if (
            $yvShippingPais.val() != "" &&
            $yvShippingProvincia.val() != "" &&
            $yvShippingCanton.val() != "" &&
            $yvShippingDistrito.val() != "" &&
            $yvShippingPostal.val() != "" &&
            $yvShippingExacta.val() != ""
        ) {
            if (mapClicked == true) {
                if (
                    $(
                        "section.type-custom-checkout .step-content-shipping-var-item input"
                    ).is(":checked")
                ) {
                    if (
                        hideLocalPickUp === true ||
                        ($(
                                "section.type-custom-checkout .step-content-shipping-var-item input:checked"
                            )
                                .parents(".step-content-shipping-var-item")
                                .index() != 0 &&
                            $("section.type-custom-checkout .step-content-shipping-var-item")
                                .length > 1)
                    ) {
                        if ($("#yv_shipping_method_loader")[0].offsetParent === null) {
                            stepThreeIsOpen = true;

                            $yvToThirdStepButton.removeClass("var-disabled");

                            return;
                        }
                    }
                }
            }
        }
    }

    var showShippingMethodsAnywayTimeout;

    function updateShippingMethods() {
        // var $shippingMethodItem = $('body').find('#shipping_method li');

        // $yvShippingMethodList.html('');

        // if ($shippingMethodItem[0]) {
        // 	$shippingMethodItem.each(function(i){
        // 		$yvShippingMethodList.append(yvShippingMethodItemHTML);

        // 		if ($(this).find('input').is(':checked')) {
        // 			$yvShippingMethodList.find('.yv-new').find('input').prop('checked', true);
        // 		}

        // 		$yvShippingMethodList.find('.yv-new').find('.step-content-shipping-var-item-text .g__text').text($(this).find('label')[0].childNodes[0].nodeValue);
        // 		$yvShippingMethodList.find('.yv-new').find('.step-content-shipping-var-item-text-2 .g__text').text($(this).find('.amount').text());

        // 		$yvShippingMethodList.find('.yv-new').removeClass('yv-new');
        // 	});
        // } else {
        // 	$yvShippingMethodList.append(yvShippingMethodItemHTML);

        // 	$yvShippingMethodList.find('.yv-new').find('.step-content-shipping-var-item-radio').remove();
        // 	$yvShippingMethodList.find('.yv-new').find('.step-content-shipping-var-item-text .g__text').text($('.woocommerce-no-shipping-available-html').text());
        // 	$yvShippingMethodList.find('.yv-new').find('.step-content-shipping-var-item-text-2 .g__text').remove();

        // 	$yvShippingMethodList.find('.yv-new').removeClass('yv-new');
        // }

        $yvShippingMethodList.hide();
        $yvShippingMethodLoader.show();

        clearTimeout(showShippingMethodsAnywayTimeout);

        showShippingMethodsAnywayTimeout = setTimeout(function () {
            $yvShippingMethodList.show();
            $yvShippingMethodLoader.hide();

            checkIfCanOpenThirdStep(false);
        }, 5000);
    }

    var $yvShippingMethodList = $("#yv_shipping_method");
    yvShippingMethodItemHTML = $(
        "#yv_shipping_method .step-content-shipping-var-item"
    )
        .addClass("yv-new")
        .parent()
        .html();
    $yvShippingMethodLoader = $("#yv_shipping_method_loader");

    $yvShippingMethodList.hide();
    $yvShippingMethodList.html("");
    $yvShippingMethodLoader.hide();

    function getShippingMethods() {
        jQuery("body").on("updated_checkout", function () {
            var $shippingMethodItem = $("body").find("#shipping_method li");

            $yvShippingMethodList.html("");

            if ($shippingMethodItem[0]) {
                $shippingMethodItem.each(function (i) {
                    $yvShippingMethodList.append(yvShippingMethodItemHTML);

                    if ($(this).find("input").is(":checked")) {
                        $yvShippingMethodList
                            .find(".yv-new")
                            .find("input")
                            .prop("checked", true);
                    }

                    $yvShippingMethodList
                        .find(".yv-new")
                        .attr("data-shipping-value", $(this).find("input").val());
                    $yvShippingMethodList
                        .find(".yv-new")
                        .find(".step-content-shipping-var-item-text .g__text")
                        .text($(this).find("label")[0].childNodes[0].nodeValue);
                    $yvShippingMethodList
                        .find(".yv-new")
                        .find(".step-content-shipping-var-item-text-2 .g__text")
                        .text($(this).find(".amount").text());

                    $yvShippingMethodList.find(".yv-new").removeClass("yv-new");
                });
            } else {
                $yvShippingMethodList.append(yvShippingMethodItemHTML);

                $yvShippingMethodList
                    .find(".yv-new")
                    .find(".step-content-shipping-var-item-radio")
                    .remove();
                $yvShippingMethodList
                    .find(".yv-new")
                    .find(".step-content-shipping-var-item-text .g__text")
                    .text($(".woocommerce-no-shipping-available-html").text());
                $yvShippingMethodList
                    .find(".yv-new")
                    .find(".step-content-shipping-var-item-text-2 .g__text")
                    .remove();

                $yvShippingMethodList.find(".yv-new").removeClass("yv-new");
            }

            $yvShippingMethodList
                .find(
                    '.step-content-shipping-var-item[data-shipping-value="' +
                    "avfdeliveries-instorepickup0" +
                    '"]'
                )
                .hide();
            $yvShippingMethodList
                .find(
                    '.step-content-shipping-var-item[data-shipping-value="' +
                    "avfdeliveries-instorepickup" +
                    '"]'
                )
                .hide();
            $yvShippingMethodList
                .find(
                    '.step-content-shipping-var-item[data-shipping-value="' +
                    "local_pickup:16" +
                    '"]'
                )
                .hide();

            $yvShippingMethodList.show();
            $yvShippingMethodLoader.hide();

            clearTimeout(showShippingMethodsAnywayTimeout);
        });
    }

    function fireKeydownEventOnElement($elem) {
        $elem.trigger("keydown");
    }

    $yvShippingMethodList.on(
        "click",
        ".step-content-shipping-var-item",
        function () {
            var $shippingMethodItem = $("body")
                .find("#shipping_method li")
                .eq($(this).index())
                .find("input");

            $shippingMethodItem.click();

            checkIfCanOpenThirdStep(false);
        }
    );

    function bindChangeOnPais() {
        $yvShippingPais.bind("input propertychange", function () {
            checkIfCanOpenThirdStep();

            $("#shipping_country").val($yvShippingPais.val());
            if (differentBillingAddress == false)
                $("#billing_country").val($yvShippingPais.val());

            $("#shipping_country").trigger("change");
            if (differentBillingAddress == false)
                $("#billing_country").trigger("change");

            // fill custom select
            $yvShippingProvincia.html("");

            $("#shipping_state option").each(function () {
                $yvShippingProvincia.append($(this).clone());
            });

            if ($("#shipping_state").val() != "") {
                $yvShippingProvincia.val($("#shipping_state").val());
            } else {
                $yvShippingProvincia.find("option").eq(0).attr("selected", "selected");
            }
            // fill custom select end

            changeTagForCanton();
        });
    }

    bindChangeOnPais();

    function changeTagForCanton() {
        if ($("#shipping_city").parent().find("select")[0]) {
            $yvShippingCanton.replaceWith(
                '<select id="' + $yvShippingCanton.attr("id") + '">'
            );
            $yvShippingCanton = $("#yv_billing_canton");

            bingChangeOnCanton();

            $yvShippingCanton.html("");

            $("#shipping_city option").each(function () {
                $yvShippingCanton.append($(this).clone());
            });

            if ($("#shipping_city").val() != "") {
                $yvShippingCanton.val($("#shipping_city").val());
            } else {
                $yvShippingCanton.find("option").eq(0).attr("selected", "selected");
            }
        } else {
            $yvShippingCanton.replaceWith(
                '<input id="' + $yvShippingCanton.attr("id") + '">'
            );
            $yvShippingCanton = $("#yv_billing_canton");

            bingChangeOnCanton();
        }
    }

    $yvShippingProvincia.bind("input propertychange", function () {
        checkIfCanOpenThirdStep();

        $("#shipping_state").val($yvShippingProvincia.val());
        if (differentBillingAddress == false)
            $("#billing_state").val($yvShippingProvincia.val());

        $("#shipping_state").trigger("change");
        if (differentBillingAddress == false) $("#billing_state").trigger("change");

        // fill custom select
        changeTagForCanton();
        // fill custom select end
    });

    function bingChangeOnCanton() {
        $yvShippingCanton.bind("input propertychange", function () {
            checkIfCanOpenThirdStep();

            $("#shipping_city").val($yvShippingCanton.val());
            if (differentBillingAddress == false)
                $("#billing_city").val($yvShippingCanton.val());

            $("#shipping_city").trigger("change");
            if (differentBillingAddress == false)
                $("#billing_city").trigger("change");

            $yvShippingPostal.val($("#shipping_postcode").val());
        });
    }

    bingChangeOnCanton();

    $yvShippingDistrito.bind("input propertychange", function () {
        checkIfCanOpenThirdStep();

        $("#shipping_address_1").val($yvShippingDistrito.val());
        if (differentBillingAddress == false)
            $("#billing_address_1").val($yvShippingDistrito.val());

        fireKeydownEventOnElement($("#shipping_address_1"));
    });

    $yvShippingPostal.bind("input propertychange", function () {
        checkIfCanOpenThirdStep();

        $("#shipping_postcode").val($yvShippingPostal.val());
        if (differentBillingAddress == false)
            $("#billing_postcode").val($yvShippingPostal.val());

        fireKeydownEventOnElement($("#shipping_postcode"));
    });

    $yvShippingExacta.bind("input propertychange", function () {
        checkIfCanOpenThirdStep(false);

        $("#shipping_exact_direction").val($yvShippingExacta.val());
        if (differentBillingAddress == false)
            $("#billing_exact_direction").val($yvShippingExacta.val());

        fireKeydownEventOnElement($("#shipping_exact_direction"));
    });

    var timeout;

    $("#yv_map").on("click", function () {
        mapClicked = true;

        $("section.type-custom-checkout .step-content-map-text-2").hide();
        $yvShippingMethodList.hide();
        $yvShippingMethodLoader.show();

        clearTimeout(timeout);

        timeout = setTimeout(function () {
            getShippingMethods();

            if (differentBillingAddress == false) {
                if (!$("#billing_country").is('input[type="hidden"]')) {
                    $("#billing_country").val($yvShippingPais.val());
                    $("#billing_country").trigger("change");
                }

                $("#billing_state").val($yvShippingProvincia.val());
                $("#billing_state").trigger("change");
                $("#billing_city").val($yvShippingCanton.val());
                $("#billing_city").trigger("change");
                $("#billing_address_1").val($yvShippingDistrito.val());
                $("#billing_postcode").val($yvShippingPostal.val());
                $("#billing_exact_direction").val($yvShippingExacta.val());
            }

            if (!$("#shipping_country").is('input[type="hidden"]')) {
                $("#shipping_country").val($yvShippingPais.val());
                $("#shipping_country").trigger("change");
            }

            $("#shipping_state").val($yvShippingProvincia.val());
            $("#shipping_state").trigger("change");
            $("#shipping_city").val($yvShippingCanton.val());
            $("#shipping_city").trigger("change");
            $("#shipping_address_1").val($yvShippingDistrito.val());
            $("#shipping_postcode").val($yvShippingPostal.val());
            $("#shipping_exact_direction").val($yvShippingExacta.val());

            $(".woocommerce-checkout").trigger("update_checkout");
        }, 500);
    });

    $("#yv_map").trigger("click");

    $shippingOrPick.on("click", function () {
        if ($("#yv_shipping_or_pick_1").is(":checked")) {
            $(".step-content-shipping-method-content-item-1").show();
            $(".step-content-shipping-method-content-item-2").hide();

            $yvToThirdStepButton.addClass("var-disabled");

            checkIfCanOpenThirdStep();

            localPickUp = false;
        }

        if ($("#yv_shipping_or_pick_2").is(":checked")) {
            $(".step-content-shipping-method-content-item-2").show();
            $(".step-content-shipping-method-content-item-1").hide();

            $yvToThirdStepButton.removeClass("var-disabled");

            var $shippingMethodItem = $("body")
                .find("#shipping_method li")
                .eq(0)
                .find("input");

            $shippingMethodItem.click();

            localPickUp = true;
        }
    });

    $yvToThirdStepButton.on("click", function () {
        $step.removeClass("active");

        $step.eq(2).addClass("active");

        $stepTab.eq(1).addClass("completed");
        $stepTab.eq(2).addClass("active");
    });
    // STEP 2 END

    // STEP 3
    var $fileForCheque = $("#alg_checkout_files_upload_1");

    var $yvDifShippingPais = $("#yv_dif_billing_pais"),
        $yvDifShippingProvincia = $("#yv_dif_billing_provincia"),
        $yvDifShippingCanton = $("#yv_dif_billing_canton");
    $yvDifShippingDistrito = $("#yv_dif_billing_distrito");
    $yvDifShippingPostal = $("#yv_dif_billing_postal");
    $yvDifShippingExacta = $("#yv_dif_billing_exacta");

    var $yvCheckoutButton = $("#yv_checkout_button");

    // function checkIfCanOpenCheckoutExecuteStep(){
    // 	if ($('#payment_method_cheque').is(':checked')) {
    // 		if ($('.alg_checkout_files_upload_result_1 img')[0]) {
    // 			stepCheckoutExecuteIsOpen = true;

    // 			$yvCheckoutButton.removeClass('var-disabled');
    // 		}
    // 	}
    // }

    // setTimeout(function(){
    // 	checkIfCanOpenCheckoutExecuteStep();
    // }, 300);

    // $fileForCheque.on('change', function(){
    // 	setTimeout(function(){
    // 		checkIfCanOpenCheckoutExecuteStep();
    // 	}, 1500);
    // });

    // $('#alg_checkout_files_upload_form_1').on('click', '.alg_checkout_files_upload_result_delete', function(){
    // 	$yvCheckoutButton.addClass('var-disabled');
    // });

    $(".step-content-payment-var-tab-item-content").hide();
    $(".step-contentelectronic-facture-content-holder").hide();
    $(".step-content-payment-electronic-facture-another-form-holder").hide();

    $(".step-content-payment-electronic-facture-label").on("click", function () {
        if ($(this).find("input").is(":checked")) {
            $(".step-contentelectronic-facture-content-holder").show();

            $("#additional_want_electronic_invoice").prop("checked", true);

            $("#yv_identification_default_info").html(`
				${$yvShippingPais.val()} / 
				${$yvShippingProvincia.find("option:selected").text()} / 
				${
                $yvShippingCanton.find("option:selected")[0]
                    ? $yvShippingCanton.find("option:selected").text()
                    : $yvShippingCanton.val()
            } / 
				${$yvShippingDistrito.val()} / 
				${$yvShippingExacta.val()}
			`);
        } else {
            $(".step-contentelectronic-facture-content-holder").hide();

            $("#additional_want_electronic_invoice").prop("checked", false);
            $("#additional_different_billing_address").prop("checked", false);

            differentBillingAddress = false;
        }
    });

    function differentBillingAddressSetupForm() {
        if ($("#billing_country").attr("type") == "hidden") {
            $yvDifShippingPais.val(
                $("#billing_country_field")
                    .find(".woocommerce-input-wrapper strong")
                    .text()
            );
        } else {
            $yvDifShippingPais.replaceWith(
                '<select id="' + $yvDifShippingPais.attr("id") + '">'
            );
            $yvDifShippingPais = $("#yv_dif_billing_pais");

            bindChangeOnDifPais();

            $yvDifShippingPais.html("");

            $("#billing_country option").each(function () {
                $yvDifShippingPais.append($(this).clone());
            });

            if ($("#billing_country").val() != "") {
                $yvDifShippingPais.val($("#billing_country").val());
            } else {
                $yvDifShippingPais.find("option").eq(0).attr("selected", "selected");
            }
        }

        changeTagForDifCanton();

        // shipping state
        $yvDifShippingProvincia.html("");

        $("#billing_state option").each(function () {
            $yvDifShippingProvincia.append($(this).clone());
        });

        if ($("#billing_state").val() != "") {
            $yvDifShippingProvincia.val($("#billing_state").val());
        } else {
            $yvDifShippingProvincia.find("option").eq(0).attr("selected", "selected");
        }
        // shipping state end

        // shipping town select
        setTimeout(function () {
            $yvDifShippingCanton.html("");

            $("#billing_city option").each(function () {
                $yvDifShippingCanton.append($(this).clone());
            });

            if ($("#billing_city").val() != "") {
                $yvDifShippingCanton.val($("#billing_city").val());
            } else {
                $yvDifShippingCanton.find("option").eq(0).attr("selected", "selected");
            }
        }, 1);
        // shipping town end
    }

    $(".step-content-payment-electronic-facture-another-label").on(
        "click",
        function () {
            if ($(this).find("input").is(":checked")) {
                $(
                    ".step-content-payment-electronic-facture-another-form-holder"
                ).show();

                $("#additional_different_billing_address").prop("checked", true);

                differentBillingAddress = true;

                differentBillingAddressSetupForm();
            } else {
                $(
                    ".step-content-payment-electronic-facture-another-form-holder"
                ).hide();

                $("#additional_different_billing_address").prop("checked", false);

                differentBillingAddress = false;
            }
        }
    );

    function bindChangeOnDifPais() {
        $yvDifShippingPais.bind("input propertychange", function () {
            $("#billing_country").val($yvDifShippingPais.val());

            $("#billing_country").trigger("change");

            // fill custom select
            $yvDifShippingProvincia.html("");

            $("#billing_state option").each(function () {
                $yvDifShippingProvincia.append($(this).clone());
            });

            if ($("#billing_state").val() != "") {
                $yvDifShippingProvincia.val($("#billing_state").val());
            } else {
                $yvDifShippingProvincia
                    .find("option")
                    .eq(0)
                    .attr("selected", "selected");
            }
            // fill custom select end

            changeTagForDifCanton();
        });
    }

    bindChangeOnDifPais();

    function changeTagForDifCanton() {
        if ($("#billing_city").parent().find("select")[0]) {
            $yvDifShippingCanton.replaceWith(
                '<select id="' + $yvDifShippingCanton.attr("id") + '">'
            );
            $yvDifShippingCanton = $("#yv_dif_billing_canton");

            bingChangeOnDifCanton();

            $yvDifShippingCanton.html("");

            $("#billing_city option").each(function () {
                $yvDifShippingCanton.append($(this).clone());
            });

            if ($("#billing_city").val() != "") {
                $yvDifShippingCanton.val($("#billilng_city").val());
            } else {
                $yvDifShippingCanton.find("option").eq(0).attr("selected", "selected");
            }
        } else {
            $yvDifShippingCanton.replaceWith(
                '<input id="' + $yvDifShippingCanton.attr("id") + '">'
            );
            $yvDifShippingCanton = $("#yv_dif_billing_canton");

            bingChangeOnDifCanton();
        }
    }

    $yvDifShippingProvincia.bind("input propertychange", function () {
        $("#billing_state").val($yvDifShippingProvincia.val());

        $("#billing_state").trigger("change");

        // fill custom select
        changeTagForDifCanton();
        // fill custom select end
    });

    function bingChangeOnDifCanton() {
        $yvDifShippingCanton.bind("input propertychange", function () {
            $("#billing_city").val($yvDifShippingCanton.val());

            $("#billing_city").trigger("change");

            $yvDifShippingPostal.val($("#billing_postcode").val());
        });
    }

    bingChangeOnDifCanton();

    $yvDifShippingDistrito.bind("input propertychange", function () {
        $("#billing_address_1").val($yvDifShippingDistrito.val());

        fireKeydownEventOnElement($("#billing_address_1"));
    });

    $yvDifShippingPostal.bind("input propertychange", function () {
        checkIfCanOpenThirdStep();

        $("#billing_postcode").val($yvDifShippingPostal.val());

        fireKeydownEventOnElement($("#billing_postcode"));
    });

    $yvDifShippingExacta.bind("input propertychange", function () {
        checkIfCanOpenThirdStep();

        $("#billing_exact_direction").val($yvDifShippingExacta.val());

        fireKeydownEventOnElement($("#billing_exact_direction"));
    });

    $("#additional_identification_type option").each(function () {
        $("#yv_additional_identification_type").append($(this).clone());
    });

    $("#yv_additional_identification_type").bind(
        "input propertychange",
        function () {
            $("#additional_identification_type").val($(this).val());
            $("#additional_identification_type").trigger("change");
        }
    );

    $("#yv_additional_identification_number").bind(
        "input propertychange",
        function () {
            $("#additional_identification_number").val($(this).val());
        }
    );

    var $checkoutLoader = $("#yv_checkout_end_loader");

    $yvCheckoutButton.on("click", function () {
        if (localPickUp == true) {
            setTimeout(function () {
                if (
                    $("#billing_country").is("select") &&
                    !$("#billing_country").val()
                ) {
                    $("#billing_country").val(
                        $("#billing_country").find("option").eq(1).val()
                    );
                    $("#billing_country").trigger("change");
                }
                if (
                    $("#shipping_country").is("select") &&
                    !$("#shipping_country").val()
                ) {
                    $("#shipping_country").val(
                        $("#shipping_country").find("option").eq(1).val()
                    );
                    $("#shipping_country").trigger("change");
                }
            }, 100);

            setTimeout(function () {
                if ($("#billing_state").is("select") && !$("#billing_state").val()) {
                    $("#billing_state").val(
                        $("#billing_state").find("option").eq(1).val()
                    );
                    $("#billing_state").trigger("change");
                }
                if ($("#shipping_state").is("select") && !$("#shipping_state").val()) {
                    $("#shipping_state").val(
                        $("#shipping_state").find("option").eq(1).val()
                    );
                    $("#shipping_state").trigger("change");
                }
            }, 200);

            setTimeout(function () {
                if ($("#billing_city").is("select") && !$("#billing_city").val()) {
                    $("#billing_city").val($("#billing_city").find("option").eq(1).val());
                    $("#billing_city").trigger("change");
                }
                if ($("#shipping_city").is("select") && !$("#shipping_city").val()) {
                    $("#shipping_city").val(
                        $("#shipping_city").find("option").eq(1).val()
                    );
                    $("#shipping_city").trigger("change");
                }
            }, 300);

            setTimeout(function () {
                if ($("#billing_country").val() == "")
                    $("#billing_country").val("Local pickup");
                if ($("#shipping_country").val() == "")
                    $("#shipping_country").val("Local pickup");

                if ($("#billing_state").val() == "")
                    $("#billing_state").val("Local pickup");
                if ($("#shipping_state").val() == "")
                    $("#shipping_state").val("Local pickup");

                if ($("#billing_city").val() == "")
                    $("#billing_city").val("Local pickup");
                if ($("#shipping_city").val() == "")
                    $("#shipping_city").val("Local pickup");

                if ($("#billing_postcode").val() == "")
                    $("#billing_postcode").val("Local pickup");
                if ($("#shipping_postcode").val() == "")
                    $("#shipping_postcode").val("Local pickup");

                if ($("#billing_address_1").val() == "")
                    $("#billing_address_1").val("Local pickup");
                if ($("#shipping_address_1").val() == "")
                    $("#shipping_address_1").val("Local pickup");
            }, 400);
        }

        $checkoutLoader.addClass("show");

        setTimeout(function () {
            $("#place_order").click();
        }, 500);

        setTimeout(function () {
            $checkoutLoader.removeClass("show");
        }, 5000);
    });
    // STEP 3 END

    // PAYMENT POSITION
    var paymentMethodHTML = `
		<div class="yv-wc_payment_method-inner">
		</div>
	`;

    var paymentOriginalY = $("#payment").offset().top;

    setInterval(function () {
        // payment
        var $payment = $("#payment"),
            $paymentDestination = $(".step-content-payment-container-for-woo");

        var paymentY = $payment.offset().top,
            paymentDestY = $paymentDestination.offset().top,
            paymentX = $payment.offset().left,
            paymentDestX = $paymentDestination.offset().left;

        var paymentDiffY = paymentDestY - paymentY,
            paymentDiffX = paymentDestX - paymentX;

        if (paymentDestY != 0) {
            $paymentDestination.css(
                "height",
                $("body").find(".wc_payment_methods").height()
            );

            $("body")
                .find(".wc_payment_methods")
                .css("top", paymentDiffY + "px");
            $("body")
                .find(".wc_payment_methods")
                .css("left", paymentDiffX + "px");
            $("body")
                .find(".wc_payment_methods")
                .css("width", $paymentDestination.width());

            $("body")
                .find(".wc_payment_method")
                .each(function () {
                    if (!$(this).find(".yv-wc_payment_method-inner")[0]) {
                        $(this).prepend(paymentMethodHTML);

                        $(this)
                            .find(".yv-wc_payment_method-inner")
                            .prepend($(this).find("> label"));
                        $(this)
                            .find(".yv-wc_payment_method-inner")
                            .prepend(
                                '<div class="yv-wc_payment_method-custom-checkbox"></div>'
                            );
                        $(this)
                            .find(".yv-wc_payment_method-inner")
                            .prepend($(this).find("> input"));
                    }
                });
        } else {
            $("body")
                .find(".wc_payment_methods")
                .css("top", 0 + "px");
        }
        // payment end

        // file for cheque
        if ($("#payment .payment_method_cheque")[0]) {
            if (!$("#payment .payment_method_cheque .yv-payment_box-inner")[0]) {
                $("body")
                    .find(".payment_box.payment_method_cheque")
                    .append('<div class="yv-payment_box-inner"></div>');
            }

            var $payment = $(".woocommerce-notices-wrapper"),
                $paymentDestination = $(".yv-payment_box-inner");

            var paymentY = $payment.offset().top,
                paymentDestY = $paymentDestination.offset().top,
                paymentX = $payment.offset().left,
                paymentDestX = $paymentDestination.offset().left;

            var paymentDiffY = paymentDestY - paymentY,
                paymentDiffX = paymentDestX - paymentX;

            if ($("#payment_method_cheque").is(":checked")) {
                $("body").find("#alg_checkout_files_upload_form_1").addClass("active");
                $("body")
                    .find("#alg_checkout_files_upload_form_1")
                    .css("top", paymentDiffY + "px");
                $("body")
                    .find("#alg_checkout_files_upload_form_1")
                    .css("left", paymentDiffX + "px");
                $("body")
                    .find("#alg_checkout_files_upload_form_1")
                    .css("width", $paymentDestination.width());

                $("body")
                    .find(".payment_box.payment_method_cheque .yv-payment_box-inner")
                    .css(
                        "height",
                        $("body").find("#alg_checkout_files_upload_form_1").height()
                    );
            } else {
                $("body")
                    .find("#alg_checkout_files_upload_form_1")
                    .css("top", -10000 + "px");
                $("body")
                    .find("#alg_checkout_files_upload_form_1")
                    .removeClass("active");
            }

            if ($("#payment_method_cheque").is(":checked")) {
                if ($(".alg_checkout_files_upload_result_1 img")[0]) {
                    stepCheckoutExecuteIsOpen = true;

                    $yvCheckoutButton.removeClass("var-disabled");
                } else {
                    $yvCheckoutButton.addClass("var-disabled");
                }
            } else {
                $yvCheckoutButton.removeClass("var-disabled");
            }
        } else {
            $("#alg_checkout_files_upload_form_1").hide();
        }
        // file for cheque end
    }, 1);
    // PAYMENT POSITION END

    // REVIEW ORDER
    setInterval(function () {
        $("#yv_subtotal").text($(".cart-subtotal bdi").text());

        if ($(".review-order-product-item-price")[0]) {
            var subTotal = 0;

            $(".review-order-product-item-price").each(function () {
                var itemQuantity = $(this).data("item-quantity");

                if (itemQuantity <= 0) {
                    itemQuantity = 1;
                }

                var str_1 = $(this).text();
                var res_1 = parseFloat(str_1.replace(/[^\d.-]/g, "")) * itemQuantity;

                subTotal += parseInt(res_1);
            });

            $("#yv_subtotal").text(
                $(".order-total .woocommerce-Price-currencySymbol").eq(0).text() +
                " " +
                subTotal.toLocaleString("en-US")
            );
        }

        if (
            $("#shipping_method")
                .find("input:checked")
                .parents("li")
                .find(".woocommerce-Price-amount")[0]
        ) {
            $("#yv_shipping_cost").text(
                $("#shipping_method")
                    .find("input:checked")
                    .parents("li")
                    .find(".woocommerce-Price-amount")
                    .text()
            );
        } else {
            $("#yv_shipping_cost").text(0);
        }
        if ($(".order-total .includes_tax .woocommerce-Price-amount")[0]) {
            $("#yv_taxes").text(
                $(".order-total .includes_tax .woocommerce-Price-amount").text()
            );
        } else {
            $("#yv_taxes").text(0);
        }
        if ($(".cart-discount")[0]) {
            $("#yv_discount").text(
                $(".cart-discount .woocommerce-Price-amount").text()
            );
        } else {
            $("#yv_discount").text(0);
        }

        // THIS ONE FOR ADDING TAX TO TOTAL FOR SPECIAL WOO SETTING
        // if ($('#yv_taxes').text() == 0) {
        // 	$('#yv_total').text($('.order-total bdi').text());
        // } else {
        // 	var str_1 = $('.order-total bdi').text();
        // 	var res_1 = parseInt(str_1.replace(/\D/g, ""));
        // 	var str_2 = $('#yv_taxes').text();
        // 	var res_2 = parseInt(str_2.replace(/\D/g, ""));
        // 	var result = res_1 + res_2;

        // 	$('#yv_total').text($('.order-total .woocommerce-Price-currencySymbol').eq(0).text() + ' ' + result.toLocaleString("en-US"));
        // }
        // THIS ONE FOR ADDING TAX TO TOTAL FOR SPECIAL WOO SETTING END

        $("#yv_total").text($(".order-total bdi").text());
    }, 1000);
    // REVIEW ORDER END
}

if ($(".woocommerce-order-received")[0]) {
    $("footer").hide();

    $("section.type-custom-checkout .step-item").addClass("active completed");

    var $registerButton = $("#yv_register_after_checkout");

    $registerButton.attr("href", $(".woocommerce-info a.button").attr("href"));

    if (!$(".woocommerce-info a.button")[0]) {
        $registerButton.hide();
    }

    $("#yv_order_number").text(
        "#" + $(".woocommerce-order-overview__order strong").text()
    );
}
// CUSTOM CHECKOUT END

// CUSTOM FIXES
setInterval(function () {
    $(".elementor-menu-cart__product-image.product-thumbnail").height(
        $(".elementor-menu-cart__product-image.product-thumbnail").width()
    );

    if (
        $("#yv_billing_pais").val() == "CR" ||
        $("#yv_billing_pais").val() == "Costa Rica"
    ) {
        if ($("#yv_distrito_and_postal_row").is(".g__form-row-1-of-2")) {
            $("#yv_distrito_and_postal_row").removeClass("g__form-row-1-of-2");

            $("#yv_billing_distrito").parents(".g__form-input").hide();

            $("#yv_billing_distrito").val("Country is Costa Rica");
            $("#yv_billing_distrito").trigger("input");
        }
    } else {
        if (!$("#yv_distrito_and_postal_row").is(".g__form-row-1-of-2")) {
            $("#yv_distrito_and_postal_row").addClass("g__form-row-1-of-2");

            $("#yv_billing_distrito").parents(".g__form-input").show();

            $("#yv_billing_distrito").val("");
        }
    }

    if (
        $("#yv_billing_pais").val() == "MX" ||
        $("#yv_billing_pais").val() == "México" ||
        $("#yv_billing_pais").val() == "Mexico"
    ) {
        var text = $("#yv_billing_provincia")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("mexico-text");
        $("#yv_billing_provincia")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        var text = $("#yv_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("mexico-text");
        $("#yv_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        var text = $("#yv_billing_distrito")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("mexico-text");
        $("#yv_billing_distrito")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        return;
    } else {
        var text = $("#yv_billing_provincia")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("text");
        $("#yv_billing_provincia")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        var text = $("#yv_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("text");
        $("#yv_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        var text = $("#yv_billing_distrito")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("text");
        $("#yv_billing_distrito")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);
    }

    if (
        $("#yv_billing_pais").val() == "CR" ||
        $("#yv_billing_pais").val() == "Costa Rica"
    ) {
        var text = $("#yv_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("costa-rica-text");
        $("#yv_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        return;
    } else {
        var text = $("#yv_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("text");
        $("#yv_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);
    }
}, 500);

// DIFF FACTURA
setInterval(function () {
    if (
        $("#yv_dif_billing_pais").val() == "CR" ||
        $("#yv_dif_billing_pais").val() == "Costa Rica"
    ) {
        if ($("#yv_dif_distrito_and_postal_row").is(".g__form-row-1-of-2")) {
            $("#yv_dif_distrito_and_postal_row").removeClass("g__form-row-1-of-2");

            $("#yv_dif_billing_distrito").parents(".g__form-input").hide();

            $("#yv_dif_billing_distrito").val("Country is Costa Rica");
            $("#yv_dif_billing_distrito").trigger("input");
        }
    } else {
        if (!$("#yv_dif_distrito_and_postal_row").is(".g__form-row-1-of-2")) {
            $("#yv_dif_distrito_and_postal_row").addClass("g__form-row-1-of-2");

            $("#yv_dif_billing_distrito").parents(".g__form-input").show();

            $("#yv_dif_billing_distrito").val("");
        }
    }

    if (
        $("#yv_dif_billing_pais").val() == "MX" ||
        $("#yv_dif_billing_pais").val() == "México" ||
        $("#yv_dif_billing_pais").val() == "Mexico"
    ) {
        var text = $("#yv_dif_billing_provincia")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("mexico-text");
        $("#yv_dif_billing_provincia")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        var text = $("#yv_dif_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("mexico-text");
        $("#yv_dif_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        var text = $("#yv_dif_billing_distrito")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("mexico-text");
        $("#yv_dif_billing_distrito")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        return;
    } else {
        var text = $("#yv_dif_billing_provincia")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("text");
        $("#yv_dif_billing_provincia")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        var text = $("#yv_dif_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("text");
        $("#yv_dif_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        var text = $("#yv_dif_billing_distrito")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("text");
        $("#yv_dif_billing_distrito")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);
    }

    if (
        $("#yv_dif_billing_pais").val() == "CR" ||
        $("#yv_dif_billing_pais").val() == "Costa Rica"
    ) {
        var text = $("#yv_dif_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("costa-rica-text");
        $("#yv_dif_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);

        return;
    } else {
        var text = $("#yv_dif_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label")
            .data("text");
        $("#yv_dif_billing_canton")
            .parents(".g__form-input")
            .find(".g__form-input-label b")
            .text(text);
    }
}, 500);
// DIFF FACTURA END

// FOOTER ALWAYS AT THE BOTTOM
setTimeout(function () {
    var $footer = $(".elementor-native-footer");

    if (!$(".elementor-editor-active")[0]) {
        if ($("body").outerHeight(true) < $(window).outerHeight(true)) {
            $footer.addClass("stick-to-bottom");
        }
    }
}, 300);
// FOOTER ALWAYS AT THE BOTTOM END
// CUSTOM FIXES END

window.addEventListener("load", (event) => {
    const pdpReviews = document.querySelector("body.product-template-default .elementor-widget-woocommerce-product-data-tabs");
    if (pdpReviews) {
        pdpReviews.parentNode.parentNode.style = 'left: -999999px; position: absolute';
    }
});