(function ($) {
  "use strict";

  var gFormSuccessTitle = "<h4>Va multumim pentru interesul acordat!</h4>";
  var gFormSuccessMessage =
    "<h6>Va vom contacta in cel mai scurt timp posibil.</h6>";

  $("#contactForm").on("submit", function (e) {
    $("#contactForm *").fadeOut(2000);
    $("#contactForm").prepend(gFormSuccessTitle + gFormSuccessMessage);
  });
})(jQuery);
