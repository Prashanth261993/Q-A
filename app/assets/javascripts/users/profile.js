function initializeUserProfile() {
    $('#user_profile_picture').on('change', function(event) {
        var files = event.target.files;
        var image = files[0]
        var reader = new FileReader();
        reader.onload = function(file) {
            var img = new Image();
            console.log(file);
            img.src = file.target.result;
            $target_image = $('#profile_picture_preview')[0];
            $target_image.src = img.src;
            $('#image-caption').hide();
        }
        reader.readAsDataURL(image);
        console.log(files);
    });
}

