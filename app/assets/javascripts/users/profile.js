
$(document).ready(function() {
    alert('asdasd');
    debugger;
    $('#user_profile_picture').on('change', function(event) {
        var files = event.target.files;
        var image = files[0]
        var reader = new FileReader();
        reader.onload = function(file) {
            var img = new Image();
            console.log(file);
            img.src = file.target.result;
            debugger;
            $('#target').html(img);
        }
        reader.readAsDataURL(image);
        console.log(files);
    });
});
