$(document).ready(function() {
  // Remove token.
  let logoutLink = $('#logout');
  logoutLink.on('click', (evt) => {
    window.localStorage.removeItem('token');
  });

  // Handler modal.
  let modalTitle = $('#modal-title');
  let modalImg = $('#modal-img');
  let modalFooter = $('#modal-footer');

  let photoImgs = $('.photo-img');
  photoImgs.each((index, element) => {
    $(element).on('click', (evt) => {
      $(modalTitle).html($(element).attr('photo-title'));
      $(modalImg).attr('src', $(element).attr('src'));
      $(modalFooter).html($(element).attr('photo-description'));
    });
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

  // Handler follow action.
  let followAction = $('#follow-action');
  followAction.on('click', (evt) => {
    evt.preventDefault();
    let href = followAction.attr('href');
    let url = `${href}?_method=PATCH&token=${followAction.attr('token')}`;
    $.ajax({
      url,
      type: 'POST',
      dataType: 'json'
    }).done(function(data) {
      if (data.value === 'follow') {
        followAction.attr('href', (href.replace('unfollow', 'follow')));
      }
      if (data.value === 'following') {
        followAction.attr('href', (href.replace('follow', 'unfollow')));
      }
      followAction.html(data.value);
    });
  });
});
