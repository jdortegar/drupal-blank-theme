jQuery(document).ready(function($) {
  // Smooth scroll on click anchors

  var isRoot = location.pathname == '/';

  if (isRoot) {
    document
      .querySelectorAll('.main-navigation a[href*="/"]')
      .forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();

          var sectionHref = this.getAttribute('href');
          var ref = sectionHref.substring(sectionHref.indexOf('#'));

          document.querySelector(ref).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        });
      });
  }

  /* Every time the window is scrolled ... */

  $(window).scroll(function() {
    // onScroll functions

    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $('.main-header, .main-navigation, .social-networks, .line').addClass(
        'front'
      );
    } else {
      $('.main-header, .main-navigation, .social-networks').removeClass(
        'front'
      );
    }

    /* Check the location of each desired element */
    $('.scroll-animation').each(function() {
      var bottom_of_object = $(this).position().top + $(this).outerHeight() / 2;
      var bottom_of_window = $(window).scrollTop() + $(window).height();

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
    var eventYearsContainer = yearsSelector.find('.events-container-post');
    yearsSelector.on('mouseenter', function() {
      yearsSelector.find('.events-container-post').show();
    });
    yearsSelector.on('mouseleave', function() {
      eventYearsContainer.hide();
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
        url: protocol_domain_val + '/custom/ajax/eventos',
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

  // Modal events
  $('.modal').on('shown.bs.modal', function() {
    var pillsHeight = $(this)
      .find('.nav-pills')
      .height();
    $(this)
      .find('.informes-content-container')
      .height(pillsHeight);
  });

  // Search Icon

  $('#magnet-icon').on('click', function() {
    $('.search-wrapper .form-search').addClass('form-control');
    $('#search-field').toggle('dimmed sbox');
  });

  console.log('hola');
  $('.eventos-container .content').height(
    $('.eventos-container .carousel-item').height() -
      $('.old-events').height() -
      100
  );

  //end JS
});
