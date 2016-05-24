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