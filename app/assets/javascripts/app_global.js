var GET = "get", POST = "post", PUT = "put", DELETE = "delete", JSON_STR = "json";
function getJSON(data, callback){
    if(callback.beforeSend) callback.beforeSend();

    var type = data.type ? data.type : GET;
    var dataType = data.dataType ? data.dataType : JSON_STR;
    var default_options = {
        url: data.url,
        type: type,
        data: data.data,
        dataType: dataType
    }
    var options = $.extend({}, default_options, data)
    var request = $.ajax(options);

    request.always(function(response) {
        if(callback.complete) callback.complete(response);
    });
    request.done(function(response) {
        if(callback.success) callback.success(response);
    });
    request.fail(function(response) {
        if(callback.failure) callback.failure(response);
    });
}

function initializeSideBar() {

    //tool tips
    $('.tooltips').tooltip();

    //popovers
    $('.popovers').popover();

    //sidebar dropdown menu
    $('#sidebar .sub-menu > a').click(function () {
        var last = $('.sub-menu.open', $('#sidebar'));
        $('.sub', last).slideUp(200);

        var sub = $(this).next();

        if (sub.is(":visible")) {
            $(this).children('.menu-arrow').removeClass('fa-chevron-down');
            $(this).children('.menu-arrow').addClass('fa-chevron-right');
            sub.slideUp(200);
        } else {
            $(this).children('.menu-arrow').removeClass('fa-chevron-right');
            $(this).children('.menu-arrow').addClass('fa-chevron-down');
            sub.slideDown(200);
        }
    });

    // sidebar menu toggle
    $(function() {
        function responsiveView() {
            var wSize = $(window).width();
            if (wSize <= 768) {
                $('#container').addClass('sidebar-close');
                $('#sidebar > ul').hide();
            }

            if (wSize > 768) {
                $('#container').removeClass('sidebar-close');
                $('#sidebar > ul').show();
            }
        }
        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
    });

    $('.toggle-nav').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-180px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '180px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    });

}