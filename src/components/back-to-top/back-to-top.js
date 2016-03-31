(function() {
  $(".sub-post button").click(function() {
    $(this).find(".scroll-top").addClass("to-top");
    $("html, body").delay(500).animate( {
      scrollTop: 0
    }, 500, function() {
      $(".scroll-top").removeClass("to-top");
    });
  });
})();

