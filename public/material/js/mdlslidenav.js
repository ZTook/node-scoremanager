$(document).ready(function () {

  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     mcontent = $('.container'),
     isClosed = false;

  trigger.click(function () {
    hamburger_cross();
  });

  mcontent.click(function () {
    if (isClosed == true) {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
      $('#wrapper').removeClass('toggled');
    }
  });

  function hamburger_cross() {

  　if (isClosed == true) {
      //overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      //overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
});
