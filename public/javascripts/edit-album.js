$(document).ready(function () {
  // Remove token.
  let logoutLink = $('#logout');
  logoutLink.on('click', (evt) => {
    window.localStorage.removeItem('token');
  });

  // Focus input photo-title
  $('#photo-title:input').focus();

  // Handler delete photo
  let deletePhotoFrm = $('#delete-photo-frm');
  let deleteBtn = $('#delete-btn');
  deleteBtn.on('click', (evt) => {
    deletePhotoFrm.trigger('submit');
  });

  // Define rules.
  let rulesValidation = {
    photoTitle: {
      required: true,
      maxlength: 140
    },
    photoDescription: {
      required: true,
      maxlength: 300
    },
    photoSharingMode: {
      required: true
    },
    photoImg: {
      extension: 'jpg|png|gif'
    }
  }

  // Define rule messages.
  let messagesValidation = {
    photoTitle: {
      required: 'Tiêu đề không được để trống',
      maxlength: 'Tiêu đề chỉ chứa tối đa 140 ký tự'
    },
    photoDescription: {
      required: 'Mô tả không được để trống',
      maxlength: 'Mô tả chỉ chứa tối đa 300 ký tự'
    },
    photoSharingMode: {
      required: 'Chế độ không được để trống',
    },
    photoImg: {
      extension: 'Vui lòng chọn hình ảnh đúng định dạng (jpg, png, gif)'
    }
  };

  // Validate form.
  $('#new-photo-frm').validate({
    rules: {
      'photo-title': rulesValidation.photoTitle,
      'photo-description': rulesValidation.photoDescription,
      'photo-sharing-mode': rulesValidation.photoSharingMode,
      'photo-img': rulesValidation.photoImg
    },
    messages: {
      'photo-title': messagesValidation.photoTitle,
      'photo-description': messagesValidation.photoDescription,
      'photo-sharing-mode': messagesValidation.photoSharingMode,
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
