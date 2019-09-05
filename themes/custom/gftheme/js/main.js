jQuery(document).ready(function($) {
  // Smooth scroll on click anchors

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
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
    var elSelector = $(this);
    elSelector.click(function() {
      $('.column-servicios').addClass('hidden-element', { duration: 1500 });
      elSelector.removeClass('hidden-element', { duration: 1500 });
    });
  });

  //

  $('.events-per-year').each(function() {
    var yearsSelector = $(this);
    yearsSelector.on('mouseenter', function() {
      yearsSelector.find('.events-container-post').show();
    });
    yearsSelector.on('mouseleave', function() {
      yearsSelector.find('.events-container-post').hide();
    });
  });

  //  Ajax Call
  // Ajax bring contact us item on page
  $('.ajaxrequest').each(function() {
    var eventRequestSelector = $(this);
    eventRequestSelector.on('click', function() {
      var evento_selected = $(this).data('nid');
      var err = '';

      var protocol_domain = window.location.href;
      var protocol_domain_arr = protocol_domain.split('/');
      var protocol_domain_val =
        protocol_domain_arr[0] + '//' + protocol_domain_arr[2];
      if (protocol_domain_arr[3].length == 2) {
        protocol_domain_val += '/' + protocol_domain_arr[3];
      }
      $('.contact-loader').show();
      $.ajax({
        type: 'GET',
        url: protocol_domain_val + '/d8theming' + '/custom/ajax/eventos',
        data: 'evento_selected=' + evento_selected,
        dataType: 'html',
        async: true,
        complete: function(data) {
          $('.contact-loader').hide();
          $('.contactblock').html(data.responseText);
        },
      });
    });
  });
  //end JS
});
