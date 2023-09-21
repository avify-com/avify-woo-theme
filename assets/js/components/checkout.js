export default class Checkout {
    constructor() {
        this.init();
    }

    init() {
        const self = this;

        self.body = $("body");
        self.currentStep = 1;

        // avify custom fields
        self.differentBillingAddress = false;
        self.avfBillingName = $("#avf_billing_name");
        self.avfBillingEmail = $("#avf_billing_email");
        self.avfBillingPhone = $("#avf_billing_tel");
        self.avfBillingCountry = $("#avf_billing_country");
        self.avfBillingState = $("#avf_billing_provincia");
        self.avfBillingCity = $("#avf_billing_city");
        self.avfBillingDistrict = $("#avf_billing_distrito");
        self.avfBillingZip = $("#avf_billing_postal");
        self.avfBillingAddress = $("#avf_billing_exacta");
        self.fileUploader = $("#alg_checkout_files_upload_form_1");
        //--
        self.avfSecondStep = $("#avf_to_second_step_button");
        self.avfThirdStep = $("#avf_to_third_step_button");
        self.avfShipOrPick = $("#avf_shipping_or_pick");
        self.avfIsPickUp = false;
        //--
        self.avfShippingMap = $("#avf_map");
        self.avfShippingMethods = $("#avf_shipping_methods");
        self.avfShippingLoader = $("#avf_shipping_methods_loader");
        self.avfShippingMethodsHTML = $("#avf_shipping_methods .step-content-shipping-var-item").addClass("avf-new-method").parent().html()
        //--
        self.avfDifBillingCountry = $("#avf_dif_billing_pais");
        self.avfDifBillingState = $("#avf_dif_billing_provincia");
        self.avfDifBillingCity = $("#avf_dif_billing_canton");
        self.avfDifBillingDistrict = $("#avf_dif_billing_distrito");
        self.avfDifBillingZip = $("#avf_dif_billing_postal");
        self.avfDifBillingAddress = $("#avf_dif_billing_exacta");
        self.avfPlaceOrder = $("#avf_checkout_button");
        self.avfCheckoutLoader = $(".avf-checkout-loader");

        // woocommerce core fields
        self.wooShippingCountry = $("#shipping_country");
        self.wooShippingName = $("#shipping_first_name");
        self.wooShippingState = $("#shipping_state");
        self.wooShippingCity = $("#shipping_city");
        self.wooShippingZip = $("#shipping_postcode");
        self.wooShippingAddress1 = $("#shipping_address_1");
        self.wooShippingExactDirection = $("#shipping_exact_direction");
        //--
        self.wooBillingEmail = $("#billing_email");
        self.wooBillingPhone = $("#billing_phone");
        self.wooBillingName = $("#billing_first_name");
        self.wooBillingCountry = $("#billing_country");
        self.wooBillingCity = $("#billing_city");
        self.wooBillingState = $("#billing_state");
        self.wooBillingZip = $("#billing_postcode");
        self.wooBillingAddress1 = $("#billing_address_1");
        self.wooBillingExactDirection = $("#billing_exact_direction");

        if (
            $("body.woocommerce-checkout").length &&
            $(".type-avify-checkout").length &&
            !$(".woocommerce-order-received").length
        ) {
            $(".yv-header-nav, .yv-header-search, .yv-header-cart, footer").hide();
            self.initObserve();
            self.initStep1();
            self.initStep2();
            self.initStep3();
            self.executeObserve();
        } else {
            $("footer").hide();
            $("section.type-avify-checkout .step-item").addClass("active completed");
            let buttonInfo = $(".woocommerce-info a.button"),
                avfRegisterButton = $("#avf_register_after_checkout")
            if (!buttonInfo) {
                avfRegisterButton.hide();
            } else {
                avfRegisterButton.attr("href", buttonInfo.attr("href"));
            }
            $("#avf_order_number").text("#" + $(".woocommerce-order-overview__order strong").text());
        }
    }

    // --

    inputEmpty(inputs) {
        let success = true;
        inputs.map(input => {
            const valid = (input.val() !== "" && input.val() !== '');
            if (!valid) {
                success = false;
            }
        });
        return success;
    }

    completeAvfSelectorWithWooSelector(wooOptions, avfSelector, wooSelector) {
        const self = this;
        avfSelector.html("");
        wooOptions.each(function () {
            avfSelector.append($(this).clone());
        });
        if (self.inputEmpty([wooSelector])) {
            avfSelector.val(wooSelector.val());
        } else {
            avfSelector.find("option").eq(0).attr("selected", "selected");
        }
    }

    fireKeydownEventOnElement($elem) {
        $elem.trigger("keydown");
    }

    // --

    checkIfCanOpenSecondStep(){
        const self = this;
        if (
            self.avfBillingName.val() &&
            self.avfBillingEmail.val() &&
            self.avfBillingPhone.val()) {
            self.avfSecondStep.removeClass("var-disabled");
        } else {
            self.avfSecondStep.addClass("var-disabled");
        }
    }

    checkIfCanOpenThirdStep() {
        const self = this;
        self.avfThirdStep.addClass("var-disabled");
        const selectedMethod = $('#shipping_method input:checked');
        if (selectedMethod.length) {
            if (self.avfIsPickUp) {
                if (selectedMethod.val().startsWith('avfdeliveries-instorepickup')) {
                    self.avfThirdStep.removeClass("var-disabled");
                }
            } else {
                if (
                    self.avfBillingCountry.val() &&
                    self.avfBillingState.val() &&
                    self.avfBillingCity.val() &&
                    self.avfBillingDistrict.val() &&
                    self.avfBillingZip.val() &&
                    self.avfBillingAddress.val()
                ) {
                    if (!selectedMethod.val().startsWith('avfdeliveries-instorepickup')) {
                        self.avfThirdStep.removeClass("var-disabled");
                    }
                }
            }
        }
    }

    // --

    shippingZonesLabels() {
        const self = this;
        const na = (a, b = true) => {
            if (a.is(".g__form-row-1-of-2")) {
                if (b) {
                    a.removeClass("g__form-row-1-of-2");
                    self.avfBillingDistrict.parents(".g__form-input").hide();
                    self.avfBillingDistrict.val("N/A");
                    self.avfBillingDistrict.trigger("input");
                }
            } else {
                if (!b) {
                    a.addClass("g__form-row-1-of-2");
                    self.avfBillingDistrict.parents(".g__form-input").show();
                    self.avfBillingDistrict.val("");
                }
            }
        }
        const complete = (a, c) => {
            a.parents(".g__form-input")
                .find(".g__form-input-label b")
                .text(a.parents(".g__form-input").find(".g__form-input-label").data(`${c}text`));
        }

        if (['CR', 'Costa Rica'].includes(self.avfBillingCountry.val())) {
            na($("#avf_district_and_postal_row"));
            na($("#avf_dif_district_and_postal_row"));
            complete(self.avfBillingCity, 'cr-');
            complete(self.avfDifBillingCity, 'cr-');
        } else {
            na($("#avf_district_and_postal_row"), false);
            na($("#avf_dif_district_and_postal_row"), false);

            if (['MX', 'México', 'Mexico'].includes(self.avfBillingCountry.val())) {
                complete(self.avfBillingState, 'mx-');
                complete(self.avfBillingCity, 'mx-');
                complete(self.avfBillingDistrict, 'mx-');
                complete(self.avfDifBillingState, 'mx-');
                complete(self.avfDifBillingCity, 'mx-');
                complete(self.avfDifBillingDistrict, 'mx-');
            } else {
                complete(self.avfBillingState, '');
                complete(self.avfBillingCity, '');
                complete(self.avfBillingDistrict, '');
                complete(self.avfDifBillingState, '');
                complete(self.avfDifBillingCity, '');
                complete(self.avfDifBillingDistrict, '');
            }
        }
    }

    initAvfBillingForm() {
        const self = this;
        if (self.wooBillingCountry.attr("type") === "hidden") {
            self.avfDifBillingCountry.val(
                $("#billing_country_field")
                    .find(".woocommerce-input-wrapper strong")
                    .text()
            );
        } else {
            self.avfDifBillingCountry.replaceWith('<select id="' + self.avfDifBillingCountry.attr("id") + '">');
            self.avfDifBillingCountry = $("#avf_dif_billing_pais");
            self.bindDifCountryChange();
            self.completeAvfSelectorWithWooSelector(
                $("#billing_country option"),
                self.avfDifBillingCountry,
                self.wooBillingCountry
            );
        }
        self.switchDifCityHTMLType();
        self.completeAvfSelectorWithWooSelector(
            $("#billing_state option"),
            self.avfDifBillingState,
            self.wooBillingState
        );
        self.completeAvfSelectorWithWooSelector(
            $("#billing_city option"),
            self.avfDifBillingCity,
            self.wooBillingCity
        );
    }

    bindDifCountryChange() {
        const self = this;
        self.avfDifBillingCountry.bind("input propertychange", function () {
            self.wooBillingCountry.val(self.avfDifBillingCountry.val());
            self.wooBillingCountry.trigger("change");
            self.completeAvfSelectorWithWooSelector(
                $("#billing_state option"),
                self.avfDifBillingState,
                self.avfBillingState
            );
            self.switchDifCityHTMLType();
            self.shippingZonesLabels();
        });
    }

    bindCountryChange() {
        const self = this;
        self.avfBillingCountry.bind("input propertychange", function () {
            self.wooShippingCountry.val(self.avfBillingCountry.val());
            self.wooShippingCountry.trigger("change");
            if (!self.differentBillingAddress) {
                self.wooBillingCountry.val(self.avfBillingCountry.val());
                self.wooBillingCountry.trigger("change");
            }
            self.completeAvfSelectorWithWooSelector(
                $("#shipping_state option"),
                self.avfBillingState,
                self.wooShippingState
            );
            self.switchCityHTMLType();
            self.shippingZonesLabels();
            self.checkIfCanOpenThirdStep();
        });
    }

    // --

    bindCityChange() {
        const self = this;
        self.avfBillingCity.bind("input propertychange", function () {
            self.wooShippingCity.val(self.avfBillingCity.val());
            self.wooShippingCity.trigger("change");
            if (!self.differentBillingAddress) {
                self.wooBillingCity.val(self.avfBillingCity.val());
                self.wooBillingCity.trigger("change");
            }
            self.avfBillingZip.val(self.wooShippingZip.val());
            self.checkIfCanOpenThirdStep();
        });
    }

    bindDifCityChange() {
        const self = this;
        self.avfDifBillingCity.bind("input propertychange", function () {
            self.wooBillingCity.val(self.avfDifBillingCity.val());
            self.wooBillingCity.trigger("change");
            self.avfDifBillingZip.val(self.wooBillingZip.val());
        });
    }

    switchCityHTMLType() {
        const self = this;
        if (self.wooShippingCity.parent().find("select")[0]) {
            self.avfBillingCity.replaceWith('<select id="' + self.avfBillingCity.attr("id") + '">');
            self.avfBillingCity = $("#avf_billing_city");
            self.completeAvfSelectorWithWooSelector(
                $("#shipping_city option"),
                self.avfBillingCity,
                self.wooShippingCity
            );
        } else {
            self.avfBillingCity.replaceWith('<input id="' + self.avfBillingCity.attr("id") + '">');
            self.avfBillingCity = $("#avf_billing_city");
        }
        self.bindCityChange();
    }

    switchDifCityHTMLType() {
        const self = this;
        if (self.wooBillingCity.parent().find("select")[0]) {
            self.avfDifBillingCity.replaceWith('<select id="' + self.avfDifBillingCity.attr("id") + '">');
            self.avfDifBillingCity = $("#avf_dif_billing_canton");
            self.completeAvfSelectorWithWooSelector(
                $("#billing_city option"),
                self.avfDifBillingCity,
                self.wooBillingCity
            );
            self.bindDifCityChange();
        } else {
            self.avfDifBillingCity.replaceWith('<input id="' + self.avfDifBillingCity.attr("id") + '">');
            self.avfDifBillingCity = $("#avf_dif_billing_canton");
            self.bindDifCityChange();
        }
    }

    // --

    initStep1() {
        const self = this,
            $step = $(".step-content-item"),
            $stepTab = $("section.type-avify-checkout .step-item");

        $step.eq(0).addClass("active");
        $stepTab.eq(0).addClass("active");
        $stepTab.on("click", function () {
            if ($(this).hasClass("active")) {
                $step.removeClass("active");
                $step.eq($(this).index()).addClass("active");
                $(this).nextAll(".step-item").removeClass("active");
                $(this).nextAll(".step-item").removeClass("completed");
                $(this).removeClass("completed active");
                $(this).addClass("active");
                self.currentStep = $(this).index() + 1;
                self.executeObserve();
            }
        });

        self.avfBillingName.val(self.wooBillingName.val() ?? self.wooShippingName.val());
        self.avfBillingEmail.val(self.wooBillingEmail.val() ?? self.wooBillingEmail.val());
        self.avfBillingPhone.val(self.wooBillingPhone.val() ?? self.wooBillingPhone.val());

        self.avfBillingName.bind("input propertychange", function () {
            self.wooBillingName.val(self.avfBillingName.val());
            self.wooShippingName.val(self.avfBillingName.val());
            self.checkIfCanOpenSecondStep();
        });
        self.avfBillingEmail.bind("input propertychange", function () {
            self.wooBillingEmail.val(self.avfBillingEmail.val());
            self.checkIfCanOpenSecondStep();
        });
        self.avfBillingPhone.bind("input propertychange", function () {
            self.wooBillingPhone.val(self.avfBillingPhone.val());
            self.checkIfCanOpenSecondStep();
        });
        self.avfSecondStep.on("click", function () {
            $step.removeClass("active");
            $step.eq(1).addClass("active");
            $stepTab.eq(0).addClass("completed");
            $stepTab.eq(1).addClass("active");
            self.currentStep = 2;
            self.executeObserve();
        });
        self.checkIfCanOpenSecondStep();
    }

    initStep2() {
        const self = this,
            $step = $(".step-content-item"),
            $stepTab = $("section.type-avify-checkout .step-item");

        if (self.wooShippingCountry.attr("type") === "hidden") {
            self.avfBillingCountry.val(
                $("#shipping_country_field")
                    .find(".woocommerce-input-wrapper strong").text()
            );
        } else {
            self.avfBillingCountry.replaceWith('<select id="' + self.avfBillingCountry.attr("id") + '">');
            self.avfBillingCountry = $("#avf_billing_country");
            self.completeAvfSelectorWithWooSelector(
                $("#shipping_country option"),
                self.avfBillingCountry,
                self.wooShippingCountry
            );
            self.bindCountryChange();
        }
        self.completeAvfSelectorWithWooSelector(
            $("#shipping_state option"),
            self.avfBillingState,
            self.wooShippingState
        );
        self.switchCityHTMLType();
        self.completeAvfSelectorWithWooSelector(
            $("#shipping_city option"),
            self.avfBillingCity,
            self.wooShippingCity
        );
        self.avfBillingDistrict.val(self.wooShippingAddress1.val());
        self.avfBillingZip.val(self.wooShippingZip.val());
        self.avfBillingAddress.val(self.wooShippingExactDirection.val());

        const avfShippingMapOrig = $("#lpac-map-container");
        if (avfShippingMapOrig.length) {
            const avfShippingMapPlace = $(".step-content-map-container");
            avfShippingMapPlace.append(avfShippingMapOrig);
        } else {
            $(".step-content-map").hide();
        }

        $(".step-content-shipping-method-content-item-2").hide();
        if (avfHidePickUp) {
            $(".step-content-shipping-method-item").eq(1).hide();
        }

        self.bindCountryChange();
        self.avfBillingState.bind("input propertychange", function () {
            self.wooShippingState.val(self.avfBillingState.val());
            self.wooShippingState.trigger("change");
            if (!self.differentBillingAddress) {
                self.wooBillingState.val(self.avfBillingState.val());
                self.wooBillingState.trigger("change");
            }
            self.switchCityHTMLType();
            self.checkIfCanOpenThirdStep();
        });
        self.bindCityChange();
        self.avfBillingDistrict.bind("input propertychange", function () {
            self.wooShippingAddress1.val(self.avfBillingDistrict.val());
            self.fireKeydownEventOnElement(self.wooShippingAddress1);
            if (!self.differentBillingAddress) {
                self.wooBillingAddress1.val(self.avfBillingDistrict.val());
                self.fireKeydownEventOnElement(self.wooBillingAddress1);
            }
            self.checkIfCanOpenThirdStep();
        });
        self.avfBillingZip.bind("input propertychange", function () {
            self.wooShippingZip.val(self.avfBillingZip.val());
            self.fireKeydownEventOnElement(self.wooShippingZip);
            if (!self.differentBillingAddress) {
                self.wooBillingZip.val(self.avfBillingZip.val());
                self.fireKeydownEventOnElement(self.wooBillingZip);
            }
            self.avfShippingMethods.hide();
            self.avfShippingLoader.show();
            self.checkIfCanOpenThirdStep();
        });
        self.avfBillingAddress.bind("input propertychange", function () {
            self.wooShippingExactDirection.val(self.avfBillingAddress.val());
            self.fireKeydownEventOnElement(self.wooShippingExactDirection);
            if (!self.differentBillingAddress) {
                self.wooBillingExactDirection.val(self.avfBillingAddress.val());
                self.fireKeydownEventOnElement(self.wooBillingExactDirection);
            }
            self.checkIfCanOpenThirdStep();
        });

        self.avfShippingMap.on("click", function () {
            $("section.type-avify-checkout .step-content-map-text-2").hide();
            self.avfShippingMethods.hide();
            self.avfShippingLoader.show();

            if (!self.differentBillingAddress) {
                if (!self.wooBillingCountry.is('input[type="hidden"]')) {
                    self.wooBillingCountry.val(self.avfBillingCountry.val());
                    self.wooBillingCountry.trigger("change");
                }
                self.avfBillingState.val(self.avfBillingState.val());
                self.avfBillingState.trigger("change");
                self.wooBillingCity.val(self.avfBillingCity.val());
                self.wooBillingCity.trigger("change");
                self.wooBillingAddress1.val(self.avfBillingDistrict.val());
                self.wooBillingZip.val(self.avfBillingZip.val());
                self.wooBillingZip.trigger("change");
                self.wooBillingExactDirection.val(self.avfBillingAddress.val());
            }

            if (!self.wooShippingCountry.is('input[type="hidden"]')) {
                self.wooShippingCountry.val(self.avfBillingCountry.val());
                self.wooShippingCountry.trigger("change");
            }
            self.wooShippingState.val(self.avfBillingState.val());
            self.wooShippingState.trigger("change");
            self.wooShippingCity.val(self.avfBillingCity.val());
            self.wooShippingCity.trigger("change");
            self.wooShippingAddress1.val(self.avfBillingDistrict.val());
            self.wooShippingZip.val(self.avfBillingZip.val());
            self.wooShippingZip.trigger("change");
            self.wooShippingExactDirection.val(self.avfBillingAddress.val());
        });
        self.avfShipOrPick.on("click", function () {
            self.avfThirdStep.addClass("var-disabled");
            if ($("#avf_shipping_or_pick_1").is(":checked")) {
                $(".step-content-shipping-method-content-item-1").show();
                $(".step-content-shipping-method-content-item-2").hide();
                self.avfIsPickUp = false;
            } else {
                $(".step-content-shipping-method-content-item-2").show();
                $(".step-content-shipping-method-content-item-1").hide();
                self.avfIsPickUp = true;
            }
            self.checkIfCanOpenThirdStep();
        });
        self.avfThirdStep.on("click", function () {
            $step.removeClass("active");
            $step.eq(2).addClass("active");
            $stepTab.eq(1).addClass("completed");
            $stepTab.eq(2).addClass("active");
            self.currentStep = 3;
            self.executeObserve();
        });
        self.avfShippingLoader.hide();
    }

    initStep3() {
        const self = this;

        self.bindDifCountryChange();
        self.avfDifBillingState.bind("input propertychange", function () {
            self.avfBillingState.val(self.avfDifBillingState.val());
            self.avfBillingState.trigger("change");

            // fill custom select
            self.switchDifCityHTMLType();
            // fill custom select end
        });
        self.bindDifCityChange();
        self.avfDifBillingDistrict.bind("input propertychange", function () {
            self.wooBillingAddress1.val(self.avfDifBillingDistrict.val());
            self.fireKeydownEventOnElement(self.wooBillingAddress1);
        });
        self.avfDifBillingZip.bind("input propertychange", function () {
            self.checkIfCanOpenThirdStep();
            self.wooBillingZip.val(self.avfDifBillingZip.val());
            self.fireKeydownEventOnElement(self.wooBillingZip);
        });
        self.avfDifBillingAddress.bind("input propertychange", function () {
            self.checkIfCanOpenThirdStep();
            self.wooBillingExactDirection.val(self.avfDifBillingAddress.val());
            self.fireKeydownEventOnElement(self.wooBillingExactDirection);
        });

        $(".step-content-payment-var-tab-item-content").hide();
        $(".step-content-electronic-facture-content-holder").hide();
        $(".step-content-payment-electronic-facture-another-form-holder").hide();
        $(".step-content-payment-electronic-facture-label").on("click", function () {
            if ($(this).find("input").is(":checked")) {
                $(".step-content-electronic-facture-content-holder").show();
                $("#additional_want_electronic_invoice").prop("checked", true);
                $("#avf_identification_default_info").html(`
				${self.avfBillingCountry.val()} / 
				${self.avfBillingState.find("option:selected").text()} / 
				${self.avfBillingCity.find("option:selected")[0]
                    ? self.avfBillingCity.find("option:selected").text()
                    : self.avfBillingCity.val()} / 
				${self.avfBillingDistrict.val()} / 
				${self.avfBillingAddress.val()}
			`);
            } else {
                $(".step-content-electronic-facture-content-holder").hide();
                $("#additional_want_electronic_invoice").prop("checked", false);
                $("#additional_different_billing_address").prop("checked", false);
                self.differentBillingAddress = false;
            }
        });
        $(".step-content-payment-electronic-facture-another-label").on("click", function () {
            if ($(this).find("input").is(":checked")) {
                $(".step-content-payment-electronic-facture-another-form-holder").show();
                $("#additional_different_billing_address").prop("checked", true);
                self.differentBillingAddress = true;
                self.initAvfBillingForm();
            } else {
                $(".step-content-payment-electronic-facture-another-form-holder").hide();
                $("#additional_different_billing_address").prop("checked", false);
                self.differentBillingAddress = false;
            }
        });

        $("#additional_identification_type option").each(function () {
            $("#avf_additional_identification_type").append($(this).clone());
        });
        $("#avf_additional_identification_type").bind("input propertychange", function () {
            $("#additional_identification_type").val($(this).val());
            $("#additional_identification_type").trigger("change");
        });
        $("#avf_additional_identification_number").bind("input propertychange", function () {
            $("#additional_identification_number").val($(this).val());
        });

        self.avfPlaceOrder.on("click", function () {
            if (self.avfIsPickUp) {
                // autocomplete
                setTimeout(function () {
                    if (self.wooBillingCountry.is("select") && !self.wooBillingCountry.val()) {
                        self.wooBillingCountry.val(self.wooBillingCountry.find("option").eq(1).val());
                        self.wooBillingCountry.trigger("change");
                    }
                    if (self.wooShippingCountry.is("select") && !self.wooShippingCountry.val()) {
                        self.wooShippingCountry.val(self.wooShippingCountry.find("option").eq(1).val());
                        self.wooShippingCountry.trigger("change");
                    }
                }, 100);
                setTimeout(function () {
                    if (self.avfBillingState.is("select") && !self.avfBillingState.val()) {
                        self.avfBillingState.val(self.avfBillingState.find("option").eq(1).val());
                        self.avfBillingState.trigger("change");
                    }
                    if (self.wooShippingState.is("select") && !self.wooShippingState.val()) {
                        self.wooShippingState.val(self.wooShippingState.find("option").eq(1).val());
                        self.wooShippingState.trigger("change");
                    }
                }, 200);
                setTimeout(function () {
                    if (self.wooBillingCity.is("select") && !self.wooBillingCity.val()) {
                        self.wooBillingCity.val(self.wooBillingCity.find("option").eq(1).val());
                        self.wooBillingCity.trigger("change");
                    }
                    if (self.wooShippingCity.is("select") && !self.wooShippingCity.val()) {
                        self.wooShippingCity.val(self.wooShippingCity.find("option").eq(1).val());
                        self.wooShippingCity.trigger("change");
                    }
                }, 300);
                setTimeout(function () {
                    if (!self.wooBillingCountry.val())
                        self.wooBillingCountry.val("Local pickup");
                    if (!self.wooShippingCountry.val())
                        self.wooShippingCountry.val("Local pickup");

                    if (!self.avfBillingState.val())
                        self.avfBillingState.val("Local pickup");
                    if (!self.wooShippingState.val())
                        self.wooShippingState.val("Local pickup");

                    if (!self.wooBillingCity.val())
                        self.wooBillingCity.val("Local pickup");
                    if (!self.wooShippingCity.val())
                        self.wooShippingCity.val("Local pickup");

                    if (!self.wooBillingZip.val())
                        self.wooBillingZip.val("Local pickup");
                    if (!self.wooShippingZip.val())
                        self.wooShippingZip.val("Local pickup");

                    if (!self.wooBillingAddress1.val())
                        self.wooBillingAddress1.val("Local pickup");
                    if (!self.wooShippingAddress1.val())
                        self.wooShippingAddress1.val("Local pickup");
                }, 400);
            }

            self.avfCheckoutLoader.addClass("show");
            setTimeout(function () {
                $("#place_order").click();
            }, 500);
            setTimeout(function () {
                self.avfCheckoutLoader.removeClass("show");
            }, 5000);
        });
    }

    // --

    observeShippingMethods() {
        const self = this,
            wooShippingMethods = self.body.find("#shipping_method li"),
            inStoreContainer = document.querySelector('.step-content-self-pickup-info');

        self.avfShippingMethods.html("");
        inStoreContainer.innerHTML = "";
        if (wooShippingMethods.length) {
            wooShippingMethods.each(function() {
                self.avfShippingMethods.append(self.avfShippingMethodsHTML);
                const wooInput = $(this).find("input"),
                    avfNewMethod = self.avfShippingMethods.find(".avf-new-method");
                avfNewMethod.find("input").attr('value', wooInput.val());
                avfNewMethod.attr("data-shipping-value", wooInput.val());
                avfNewMethod.find(".step-content-shipping-var-item-text .g__text").text($(this).find("label")[0].childNodes[0].nodeValue);
                avfNewMethod.find(".step-content-shipping-var-item-text-2 .g__text").text($(this).find(".amount").text());
                if (wooInput.is(":checked")) {
                    avfNewMethod.find("input").prop("checked", true);
                }

                // in store methods
                if (wooInput.val().startsWith('avfdeliveries-instorepickup')) {
                    const instoreMethod = document.createElement('div');
                    instoreMethod.className = avfNewMethod.attr('class');
                    instoreMethod.innerHTML = avfNewMethod.html();
                    inStoreContainer.appendChild(instoreMethod);
                    instoreMethod.addEventListener('click', (e) => {
                        wooInput.click();
                        self.checkIfCanOpenThirdStep();
                    });
                    if (wooInput.is(":checked")) {
                        instoreMethod.querySelector("input").setAttribute("checked", "true");
                    }
                    avfNewMethod.remove();
                } else {
                    avfNewMethod.removeClass("avf-new-method");
                }
            });

            // on click avify shipping methods
            if (!self.avfShippingMethods.hasClass('evented')) {
                self.avfShippingMethods.addClass('evented')
                self.avfShippingMethods.on("click", ".step-content-shipping-var-item", (e) => {
                    const shippingMethod = $(e.target).attr('value');
                    if (shippingMethod) {
                        self.body
                            .find("#shipping_method li")
                            .find(`input[value='${shippingMethod}']`)
                            .click();
                        self.checkIfCanOpenThirdStep();
                    }
                });
            }
        } else {
            // todo show message
        }

        self.avfShippingMethods.show();
        self.avfShippingLoader.hide();
        self.checkIfCanOpenThirdStep();
    }

    observePaymentMethods() {
        const self = this;

        // render into custom container
        const paymentMethodHTML = `<div class="avf-payment-method-container"></div>`;
        self.body
            .find(".wc_payment_method")
            .each(function () {
                if (!$(this).find(".avf-payment-method-container").length) {
                    $(this).prepend(paymentMethodHTML);
                    $(this).find(".avf-payment-method-container").prepend($(this).find("> label"));
                    $(this).find(".avf-payment-method-container").prepend('<div class="avf-payment-method-checkbox"></div>');
                    $(this).find(".avf-payment-method-container").prepend($(this).find("> input"));
                    $(this).on("click", function() {
                        self.observeBankAttachment($(this))
                    })
                }
            });

        // relocate
        const wooPaymentMethods = self.body.find(".wc_payment_methods")
        if (self.currentStep === 3) {
            console.log('relocating payment methods');
            wooPaymentMethods.show();
            self.fileUploader.show();

            const wooPaymentContainer = $("#payment"),
                avfPaymentContainer = $(".step-content-payment-container-for-woo"),
                y = avfPaymentContainer.offset().top - wooPaymentContainer.offset().top,
                x = avfPaymentContainer.offset().left - wooPaymentContainer.offset().left;
            avfPaymentContainer.css("height", wooPaymentMethods.height());
            wooPaymentMethods.css("top", y + "px");
            wooPaymentMethods.css("left", x + "px");
            wooPaymentMethods.css("width", avfPaymentContainer.width());
        } else {
            wooPaymentMethods.hide();
            self.fileUploader.hide();
        }
    }

    observeBankAttachment(element = null) {
        const self = this;
        if ($("#payment .payment_method_cheque").length) {
            if (!$("#payment .payment_method_cheque .avf-banktransfer-attachment").length) {
                self.body.find(".payment_box.payment_method_cheque").append('<div class="avf-banktransfer-attachment"></div>');
            }
        } else {
            self.fileUploader.hide();
        }

        if (!element) {
            element = $('body').find("input[name='payment_method']:checked").parent();
        }

        if (element) {
            if (element.find("input[name='payment_method']").attr('id') === 'payment_method_cheque') {
                let from = $(".woocommerce-notices-wrapper"),
                    to = $(".avf-banktransfer-attachment"),
                    y = to.offset().top - from.offset().top,
                    x = to.offset().left - from.offset().left;
                to.css("height", self.fileUploader.height());
                self.fileUploader.css("top", y + "px");
                self.fileUploader.css("left", x + "px");
                self.fileUploader.css("width", to.width());
                if ($(".alg_checkout_files_upload_result_1 img").length) {
                    self.avfPlaceOrder.removeClass("var-disabled");
                } else {
                    self.avfPlaceOrder.addClass("var-disabled");
                }
            } else {
                self.fileUploader.css("top", -10000 + "px");
                self.avfPlaceOrder.removeClass("var-disabled");
            }
        }
    }

    observeOrderSummary() {
        // subtotal
        if ($(".review-order-product-item-price").length) {
            let subTotal = 0;
            $(".review-order-product-item-price").each(function () {
                let itemQuantity = $(this).data("item-quantity");
                if (itemQuantity <= 0) {
                    itemQuantity = 1;
                }
                subTotal += parseFloat($(this).text().replace(/[^\d.-]/g, "")) * itemQuantity;
            });
            $("#avf_subtotal").text(
                $(".order-total .woocommerce-Price-currencySymbol").eq(0).text() +
                " " +
                subTotal.toLocaleString("en-US")
            );
        } else {
            $("#avf_subtotal").text($(".cart-subtotal bdi").text());
        }

        // shipping cost
        if ($("#shipping_method")
            .find("input:checked")
            .parents("li")
            .find(".woocommerce-Price-amount")[0]
        ) {
            $("#avf_shipping_cost").text(
                $("#shipping_method")
                    .find("input:checked")
                    .parents("li")
                    .find(".woocommerce-Price-amount")
                    .text()
            );
        } else {
            $("#avf_shipping_cost").text(0);
        }

        // tax
        if ($(".order-total .includes_tax .woocommerce-Price-amount").length) {
            $("#avf_taxes").text(
                $(".order-total .includes_tax .woocommerce-Price-amount").text()
            );
        } else {
            $("#avf_taxes").text(0);
        }

        // discount
        if ($(".cart-discount").length) {
            $("#avf_discount").text(
                $(".cart-discount .woocommerce-Price-amount").text()
            );
        } else {
            $("#avf_discount").text(0);
        }

        // total
        $("#avf_total").text($(".order-total bdi").text());
    }

    executeObserve() {
        console.log('executing observe');
        const self = this;
        self.observeShippingMethods();
        self.observePaymentMethods();
        self.observeBankAttachment();
        self.observeOrderSummary();
    }

    initObserve() {
        const self = this;
        this.body.on("updated_checkout", function () {
            console.log('updated_checkout');
            self.executeObserve();
        });
        ['scroll', 'resize'].map((event) => {
            window.addEventListener(event, function(){
                self.observePaymentMethods();
                self.observeBankAttachment();
            });
        });
    }
}
