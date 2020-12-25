$(document).ready(function() {
  // Remove token.
  let logoutLink = $('#logout');
  logoutLink.on('click', (evt) => {
    window.localStorage.removeItem('token');
  });
  
  // Focus input photo-title
  $('#album-title:input').focus();

  // Define rules.
  let rulesValidation = {
    albumTitle: {
        required: true,
        maxlength: 140
    },
    albumDescription: {
      required: true,
      maxlength: 300
    },
    albumSharingMode: {
      required: true
    },
    photoImg: {
      required: true,
      extension: 'jpg|png|gif'
    }
};

// Define rule messages.
let messagesValidation = {
    albumTitle: { 
      required: 'Tiêu đề không được để trống',
      maxlength: 'Tiêu đề chỉ chứa tối đa 140 ký tự'
    },
    albumDescription: {
      required: 'Mô tả không được để trống',
      maxlength: 'Mô tả chỉ chứa tối đa 300 ký tự'
    },
    albumSharingMode: {
      required: 'Chế độ không được để trống',
    },
    photoImg: {
      required: 'Hình ảnh không được để trống',
      extension: 'Vui lòng chọn hình ảnh đúng định dạng (jpg, png, gif)'
    }
};

  // Validate form.
  $('#new-album-frm').validate({
      rules: {
        'album-title': rulesValidation.albumTitle,
        'album-description': rulesValidation.albumDescription,
        'album-sharing-mode': rulesValidation.albumSharingMode,
        'photo-img': rulesValidation.photoImg
      },
      messages: {
        'album-title': messagesValidation.albumTitle,
        'album-description': messagesValidation.albumDescription,
        'album-sharing-mode': messagesValidation.albumSharingMode,
        'photo-img': messagesValidation.photoImg
      }
  });


  // Handler add photos for album.
  let photoAlbum = $('.photo-album');
  let photoImg = $('#photo-img');
  let addPhotoIcon = $('#add-photo-icon');

  addPhotoIcon.on('click', (evt) => {
    photoImg.trigger('click');
  });
  function readURL(input) {
    if (input.files && input.files[0]) {
      if (input.files[0].type === 'image/jpeg') {
        let reader = new FileReader();
        reader.onload = function(evt) {
          photoAlbum.css('background-image', `url(${ evt.target.result })`);
          photoAlbum.css('background-size', '100% 100%');
          addPhotoIcon.hide();
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
  photoImg.on('change', function(evt) {
    readURL(this);
  });

  // Handler cancel add photos for album
  let photoRemove = $('#photo-remove');
  photoRemove.on('click', function(evt) {
    photoAlbum.css('background-image', 'none');
    addPhotoIcon.show();
  });
});