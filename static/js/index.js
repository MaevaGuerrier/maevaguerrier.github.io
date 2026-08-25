window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Toggle mobile navbar menu
    $(document).on("click", ".navbar-burger", function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    var options = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false, // Managed dynamically by video end / timer events below
      pagination: true,
      navigation: true
    };

    // Initialize all carousels
    var carousels = bulmaCarousel.attach('.carousel', options);

    carousels.forEach(function(carousel) {
      var fallbackTimer = null;
      var FALLBACK_DELAY = 5000; // 5 seconds display time for non-video slides

      function handleSlideTransition() {
        // Clear any running fallback timer
        if (fallbackTimer) {
          clearTimeout(fallbackTimer);
          fallbackTimer = null;
        }

        // Get the currently active slide container
        var activeSlide = carousel.element.querySelector('.slider-item.is-active');
        if (!activeSlide) return;

        var video = activeSlide.querySelector('video');

        if (video) {
          // Reset video to start and play
          video.currentTime = 0;
          
          // Ensure ended event isn't duplicated
          video.onended = null;
          video.onended = function() {
            carousel.next();
          };

          var playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(function(error) {
              console.warn("Autoplay blocked or interrupted:", error);
              // Fall back to timer if autoplay policy prevents video playback
              fallbackTimer = setTimeout(function() {
                carousel.next();
              }, FALLBACK_DELAY);
            });
          }
        } else {
          // If slide has an image or standard content, advance after FALLBACK_DELAY
          fallbackTimer = setTimeout(function() {
            carousel.next();
          }, FALLBACK_DELAY);
        }
      }

      // Trigger transition logic on slide change
      carousel.on('after:show', function() {
        handleSlideTransition();
      });

      // Start handling for the initial slide
      handleSlideTransition();
    });
});