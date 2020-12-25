$(document).ready(function() {
  // Remove token.
  let logoutLink = $('#logout');
  logoutLink.on('click', (evt) => {
    window.localStorage.removeItem('token');
  });
  
  // Focus input photo-title
  $('#photo-title:input').focus();

  // Handler click link content left.
  let a = $('.content__left-link > a');

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
      required: true,
      extension: 'jpg|png|gif'
    }
};

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
      required: 'Hình ảnh không được để trống',
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
});