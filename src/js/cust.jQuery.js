$(
  (function() {
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 500) {
        $(".site-header")
          .removeClass("large-title")
          .addClass("small-title");
      } else {
        $(".site-header")
          .removeClass("small-title")
          .addClass("large-title");
      }
    });
  })(jQuery)
);
