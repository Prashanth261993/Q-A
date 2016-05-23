function removeListTableRow(index){
    var $targetButton = $('#list-topics a[id = '+index+ ']');
    var $targetRow = $targetButton.parent().parent();
    $targetButton.attr('disabled','true');
    $targetRow.addClass('dither-row');
}

function addUserTableRow(index){

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
            var taret_index = this.getAttribute('id');
            removeListTableRow(taret_index);
            addUserTableRow(taret_index);
        });
    }
}

$(document).ready  (function(){
        populateListTable(topics);
        $(".tagsinput").tagsinput();

    }

);