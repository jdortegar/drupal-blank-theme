jQuery(document).ready(function($) {
  // Smooth scroll on click anchors

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
  });

  /* Every time the window is scrolled ... */

  $(window).scroll(function() {
    // onScroll functions

    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $('.main-header, .main-navigation, .social-networks').addClass('blue');
    } else {
      $('.main-header, .main-navigation, .social-networks').removeClass('blue');
    }

    /* Check the location of each desired element */
    $('.scroll-animation').each(function() {
      var bottom_of_object = $(this).position().top + $(this).outerHeight() / 2;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      console.log('bottom_of_object', bottom_of_object);
      console.log('bottom_of_window', bottom_of_window);

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
        // $(this).animate({ opacity: '1' }, 1500);
        $(this).addClass('come-in');
      }
    });
  });

  // Servicios funtionality

  $('.column-servicios').each(function() {
    console.log('services');
    var elSelector = $(this);
    elSelector.click(function() {
      $('.column-servicios').addClass('hidden-element', { duration: 1500 });
      elSelector.removeClass('hidden-element', { duration: 1500 });
    });
  });
});
