
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
  let showAlbum = $('#show-album');
  let modalFooter = $('#modal-footer');
  let photoComponentImg = $('.photo-component__img');

  photoComponentImg.each((index, element) => {
    $(element).on('click', (evt) => {
      $(modalTitle).html($(element).attr('album-title'));
      $(modalFooter).html($(element).attr('album-description'));

      let htmlFormat = '';
      let photosUrl = $(element).attr('album-photos-url').split(',');
      for (let i = photosUrl.length - 1; i >= 0; i--) {
        let addtitionClass = '';
        console.log(photosUrl[i]);
        if (i === photosUrl.length - 1) {
            addtitionClass = 'active';
        }
        htmlFormat += `<div class="carousel-item ${addtitionClass}">
                            <img class="d-block img-fluid" src="${photosUrl[i]}" alt="${photosUrl[i]}" />
                        </div>`;
      }
      showAlbum.html(htmlFormat);
    });
  });

  // Handler action like photo
  let aTagLikeAlbum = $('.a-like-album');
  let likeCount = $('.like-count');

  aTagLikeAlbum.each((index, element) => {
    $(element).on('click', (evt) => {
      let url = `${$(element).attr('server')}/album/${$(element).attr('album-id')}/like?_method=PATCH&token=${$(element).attr('token')}`;
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
