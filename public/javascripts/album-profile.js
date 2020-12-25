$(document).ready(function() {
  // Remove token.
  let logoutLink = $('#logout');
  logoutLink.on('click', (evt) => {
    window.localStorage.removeItem('token');
  });

  // Handler public photos.
  let blocks = $('.block');
  blocks.each((index, element) => {
    $(element).on('click', (evt) => {
      let url = `${$(element).attr('server')}/photo/${$(element).attr('photo-id')}/public?_method=PATCH&token=${$(element).attr('token')}`;
      $.ajax({
        url,
        type: 'POST',
        dataType: 'json'
      }).done(function(data) {
        $(element).hide();
      });
    });
  });
});