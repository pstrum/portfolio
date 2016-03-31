(function() {
  "use strict";

  document.addEventListener('scroll', function(e){

    var bodyHasScrolled = document.body.scrollTop;
    var bodyHeight = document.body.scrollHeight;
    var windowHeight = window.innerHeight;

    if (bodyHasScrolled + windowHeight == bodyHeight) {

      socialLinks.className += " activeLinks";

    } else if (bodyHasScrolled + windowHeight < bodyHeight - 50 && socialLinks.classList.contains("activeLinks")) {

      socialLinks.classList.remove("activeLinks");

    }
  });

})();
