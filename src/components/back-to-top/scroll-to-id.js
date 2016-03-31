(function() {
  "use strict";

  $(".scroll-links a").click(function(e) {

    e.preventDefault();

    var toWhere = $(this).attr("href");

    if (toWhere == "#contact-links") {

      $("html, body").animate( {
        scrollTop: $(toWhere).offset().top
      }, 300);

      $(".social-links").addClass("active-links");

      delayScroll();

      function delayScroll() {
        window.setTimeout(function(){
          $(window).scroll(function(event) {

            $(".social-links").removeClass("active-links");
            $(window).off('scroll');
          });

        }, 500);
      }

    } else {

      $("html, body").animate( {
        scrollTop: $(toWhere).offset().top
      }, 300);

    }
    return false;
  });
})();
