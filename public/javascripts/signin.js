$(document).ready(function() {
  // Focus input email
  $('#email:input').focus();

  // Define rules.
  let rulesValidation = {
      email: {
        required: true,
        maxlength: 255,
        emailFormat: true
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 64,
      }
  };

  // Define rule messages.
  let messagesValidation = {
      email: {
        required: 'Email không được để trống',
        maxlength: 'Email chỉ chứa tối đa 25 ký tự',
        emailFormat: 'Email phải đúng định dạng'
      },
      password: {
        required: 'Mật khẩu không được để trống',
        minlength: 'Mật khẩu phải chứa ít nhất 6 ký tự',
        maxlength: 'Mật khẩu chỉ chứa tối đa 64 ký tự'
    }
  };

  // Add rule method.
  $.validator.addMethod('emailFormat', function(value, element) {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return this.optional(element) || value.match(emailRegex);
  });

  // Validate form.
  $('#signin-form').validate({
      rules: {
        'email': rulesValidation.email,
        'password': rulesValidation.password
      },
      messages: {
        'email': messagesValidation.email,
        'password': messagesValidation.password
      }
  });
});