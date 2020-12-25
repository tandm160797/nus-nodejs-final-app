
$(document).ready(function() {

  // // Handler click link content left.
  // let contentLeftLinks = $('.content__left-link a');
  // contentLeftLinks.each((index, element) => {
  //   $(element).on('click', (evt) => {
  //     $(element).addClass('content__left-link--active');
  //   });
  // });

  // Logout.
  let logoutLink = $('#logout');
  logoutLink.on('click', (evt) => {
    logoutLink.attr('href', '/user/signin');
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

  // Handler action like photo
  let aTagLikePhoto = $('.a-like-photo');
  let likeCount = $('.like-count');

  aTagLikePhoto.each((index, element) => {
    $(element).on('click', (evt) => {
      let url = `${$(element).attr('server')}/photo/${$(element).attr('photo-id')}/like?_method=PATCH&token=${$(element).attr('token')}`;
      $.ajax({
        url,
        type: 'POST',
        dataType: 'json'
      }).done(function(data) {
        $(likeCount.get(index)).html(` ${data}`);
      });
    });
  });
});
