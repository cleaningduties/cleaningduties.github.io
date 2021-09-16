(function ($) {
  "use strict";

  var gFormSuccessTitle = "<h4>Va multumim pentru interesul acordat!</h4>";
  var gFormSuccessMessage =
    "<h6>Va vom contacta in cel mai scurt timp posibil.</h6>";

  $("#gform").on("submit", function (e) {
    $("#gform *").fadeOut(2000);
    $("#gform").prepend(gFormSuccessTitle + gFormSuccessMessage);
  });
})(jQuery);
