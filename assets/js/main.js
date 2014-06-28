(function(d, w, jQuery){

    var loc = document.location.toString(),
        mobile = /mobile|Android|BlackBerry|BB10|IEMobile\/9|iPhone|iPad|iPod|PlayBook|Skyfire/i.test(navigator.userAgent),
        isMac = navigator.platform.toUpperCase().indexOf('MAC')!==-1,
        browser = {},
        is_lt_ie9 = false;

    var s = $(this),
        flag = $(".union-jack"),
        txtTitle = $(".text-title"),
        txtIntro = $(".text-intro"),
        bgBlack = $(".bg-colour.black"),
        bgBlue = $(".bg-colour.blue"),
        crossRed = $(".vertical-red, .horizontal-red, .top-left-blue.red, .top-right-blue.red, .bottom-right-blue.red, .bottom-left-blue.red");

    jQuery.prototype.extend({

        contextualize: function() {

            return this.each(function(){

                s.phase1();

            });

        },

        phase1: function() {
            txtTitle.delay(1000).fadeIn(2000).promise().done(function() {
                s.phase2();
            });
        },

        phase2: function() {
            txtTitle.delay(1000).fadeOut(2000);
            flag.delay(4000).fadeIn(5000).promise().done(function() {
                s.phase3();
            });
        },

        phase3: function() {
            txtTitle.fadeOut(800);
            txtIntro.fadeIn(20000);
            bgBlue.fadeOut(20000).promise().done(function() {
                s.phase4();
            });
        },

        phase4: function() {
            if (flag.hasClass("full")) {
                crossRed.fadeOut(20000);
                txtIntro.fadeOut(15000);
                bgBlack.fadeIn(20000);
            }
        }

    });

    var getScript = jQuery.getScript;

    jQuery.extend(jQuery,{

        getScript: function(resources, callback) {

            var
            length = resources.length,
            handler = function() { counter++; },
            deferreds = [],
            counter = 0,
            idx = 0;

            for ( ; idx < length; idx++ ) {
                deferreds.push(
                    getScript( resources[ idx ], handler )
                );
            }

            $.when.apply( null, deferreds ).then(function() {
                callback && callback();
            });
        },

        browser: function() {

            var ua = navigator.userAgent.toLowerCase(),
                match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                [];

            return {
                name: match[ 1 ] || "",
                version: match[ 2 ] || "0"
            };
        },

        init: function() {

            var browser_info = $.browser();

            if(browser_info) {
                browser.name = browser_info.name;
                browser.version = parseFloat(browser_info.version);
            }

            is_lt_ie9 = (browser.name == 'msie' && browser.version < 9) ? true : false;

            $(d).contextualize();

        }

    });

    $(d).ready(function(){

        var s = $(this),
            path_js = $('body').attr("data-path-js"),
            scripts = [
                //path_js + "jquery.name.js",
            ];

        if(scripts.length > 0) {

            $.getScript(scripts, function(data, textStatus) {
                $.init();
            });

        } else $.init();

    });

})(document, window, jQuery);
