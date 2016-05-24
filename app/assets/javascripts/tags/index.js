//= require app_global


function removeListTableRow(index){
    var $targetButton = $('#list-topics a[id = '+index+ ']');
    var $targetRow = $targetButton.parent().parent();
    $targetButton.attr('disabled','true');
    $targetRow.addClass('dither-row');
}

function addUserTableRow(index){

    if (0 == number_of_tags)
         $('#user-topics > tbody').children()[0].remove();
    var topic_to_be_added = $.grep(topics, function (topic) {
        return topic.id == index;
    });
    var rowString = '<tr><td>'+(number_of_tags+1)+'</td><td>'+topic_to_be_added[0].name+
        '</td><td><a class = "btn btn-danger" id = "'+topic_to_be_added[0].id+'"><i class = "fa fa-minus-square"></i></a></td></tr>';
    $('#user-topics > tbody:last-child').append(rowString);
    number_of_tags = $('#user-topics a').length;

    if(topic_ids_followed_by_user.indexOf(topic_to_be_added[0].id) == -1)
        newly_added_topic_ids.push(topic_to_be_added[0].id);

    $('#update-tags-btn').removeAttr('disabled');
    addUserTableEvents();

}


function populateListTable(topics){

    var rowString = "";
    var i = 0;
    for (var index in topics)
    {
        i++;
        rowString = rowString + '<tr><td>'+i+'</td><td>'+topics[index].name+
            '</td><td><a class = "btn btn-success" id = "'+topics[index].id+'"><i class = "fa fa-check-square-o"></i></a></td></tr>';
    }

    $('#list-topics > tbody:last-child').append(rowString);
    if("" !== rowString){
        $('#list-topics a').click(function(){
            var target_index = this.getAttribute('id');
            removeListTableRow(target_index);
            addUserTableRow(target_index);
        });
    }
}

function removeUserTableRow(index){
    var $targetButton = $('#user-topics a[id = '+index+ ']');
    var $targetRow = $targetButton.parent().parent();
    $targetRow.remove();
    number_of_tags = $('#user-topics a').length;

    if( number_of_tags == 0 && $targetRow.length != 0 ){
    var rowString = '<tr><td colspan = "3" style="text-align: center; font-size: large"> No topics added yet</td></tr>'
        $('#user-topics > tbody:last-child').append(rowString);
        $('#update-tags-btn').attr('disabled','true');
    }
    else{
        $('#update-tags-btn').removeAttr('disabled');
    }

    var topic_to_be_deleted = $.grep(topics, function (topic) {
        return topic.id == index;
    });

    if(topic_ids_followed_by_user.indexOf(topic_to_be_deleted[0].id) != -1)
        topic_ids_to_be_deleted.push(topic_to_be_deleted[0].id);

    if(newly_added_topic_ids.indexOf(topic_to_be_deleted[0].id) != -1)
    {
        newly_added_topic_ids.splice(newly_added_topic_ids.indexOf(topic_to_be_deleted[0].id),1)
    }
}

function enableListTableRow(index){
    var $targetButton = $('#list-topics a[id = '+index+ ']');
    if ($targetButton.length !== 0){
        var $targetRow = $targetButton.parent().parent();
        $targetButton.removeAttr('disabled');
        $targetRow.removeClass('dither-row');
    }
}

function addUserTableEvents(){
    $('#user-topics a').click(function(){
        var target_index = this.getAttribute('id');
        removeUserTableRow(target_index);
        enableListTableRow(target_index);
    });
}

function updateUserTopics(){
    getJSON({
        url: update_user_tags_url,
        data: { authenticity_token: authenticity_token, topics_to_be_added: newly_added_topic_ids, topics_to_be_removed: topic_ids_to_be_deleted },
        type: POST
    },{
        progress: function(){
        },
        success: function(response){
            var data = response;
            if(data.status){
                alert(data.message);
            }
            else{
                alert(data.message);
            }
        },
        failure: function(response){
            alert(data.message);
        }
    })
}

$(document).ready  (function(){

        if(number_of_tags != 0)
            addUserTableEvents();

        populateListTable(topics);
        $('#update-tags-btn').click(updateUserTopics);
        $(".tagsinput").tagsinput();

    }

);