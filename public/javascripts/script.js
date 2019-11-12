$(document).ready(function() {

  let wrapper = $('.wrapper');
  let button = $('.houses__moreBtn');
  $('.btn').click((e) => {
    wrapper.addClass('showWrapper');
    button.css('margin-top', '100px');
  })

})
