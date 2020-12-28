$(document).ready(function() {
  // Remove token.
  let logoutLink = $('#logout');
  logoutLink.on('click', (evt) => {
    window.localStorage.removeItem('token');
  });

  // Handler modal.
  let modalTitle = $('#modal-title');
  let showAlbum = $('#show-album');
  let modalFooter = $('#modal-footer');
  let photoAlbum = $('.photo-album');

  photoAlbum.each((index, element) => {
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

  // Handler public albums.
  let blocks = $('.block');
  blocks.each((index, element) => {
    $(element).on('click', (evt) => {
      let url = `${$(element).attr('server')}/album/${$(element).attr('album-id')}/public?_method=PATCH&token=${$(element).attr('token')}`;
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