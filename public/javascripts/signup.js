$(document).ready(function() {
  // Focus input first-name
  $('#first-name:input').focus();

  // Define rules.
  let rulesValidation = {
      firstName: {
          required: true,
          maxlength: 25
      },
      lastName: {
        required: true,
        maxlength: 25
      },
      email: {
        required: true,
        maxlength: 255,
        emailFormat: true
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 64,
      },
      passwordConfirm: {
        required: true,
        minlength: 6,
        maxlength: 64,
        passwordConfirm: true
      }
  };

  // Define rule messages.
  let messagesValidation = {
      firstName: {
          required: 'Họ không được để trống',
          maxlength: 'Họ chỉ chứa tối đa 25 ký tự'
      },
      lastName: {
        required: 'Tên không được để trống',
        maxlength: 'Tên chỉ chứa tối đa 25 ký tự'
      },
      email: {
        required: 'Email không được để trống',
        maxlength: 'Email chỉ chứa tối đa 25 ký tự',
        emailFormat: 'Email phải đúng định dạng'
      },
      password: {
          required: 'Mật khẩu không được để trống',
          minlength: 'Mật khẩu phải chứa ít nhất 6 ký tự',
          maxlength: 'Mật khẩu chỉ chứa tối đa 64 ký tự'
      },
      passwordConfirm: {
          required: 'Mật khẩu không được để trống',
          minlength: 'Mật khẩu phải chứa ít nhất 6 ký tự',
          maxlength: 'Mật khẩu chỉ chứa tối đa 64 ký tự',
          passwordConfirm: 'Mật khẩu không trùng khớp'
      }
  };

  // Add rule method.
  $.validator.addMethod('passwordConfirm', function(value, element) {
      let nameOfElement = element.name;
      let lengthOfName = nameOfElement.length;
      if (nameOfElement.indexOf('-confirm') !== -1) {
          let confirm = nameOfElement.slice(lengthOfName - 8, lengthOfName);
          if (confirm === '-confirm') {
              let rest = nameOfElement.slice(0, lengthOfName - 8);
              let confirmValue = $(`input[name='${rest}']`).val();
              return this.optional(element) || ((confirmValue === value) || confirmValue === '');
          }
          return false;
      }
      return false;
  });

  $.validator.addMethod('emailFormat', function(value, element) {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return this.optional(element) || value.match(emailRegex);
  });

  // Validate form.
  $('#signup-form').validate({
      rules: {
        'first-name': rulesValidation.firstName,
        'last-name': rulesValidation.lastName,
        'email': rulesValidation.email,
        'password': rulesValidation.password,
        'password-confirm': rulesValidation.passwordConfirm
      },
      messages: {
        'first-name': messagesValidation.firstName,
        'last-name': messagesValidation.lastName,
        'email': messagesValidation.email,
        'password': messagesValidation.password,
        'password-confirm': messagesValidation.passwordConfirm
      }
  });
});