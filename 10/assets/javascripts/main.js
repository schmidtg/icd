$(document).ready(function() {
  $('.button-print').on('click', function() {
    var $selectedChoices = $('.select2-selection__choice');
    var sizeSelected = $selectedChoices.size();
    var split = sizeSelected / 2;

    // clear col2
    $('.col1of2').html('<ul></ul>');
    $('.col2of2').html('<ul></ul>');

    $selectedChoices.each(function(index) {
      var $text = $(this).clone();
      var newElement = $('<li>').append($text.attr('title'));
      if (index < split) {
        $(newElement).appendTo('.col1of2 ul');
      } else {
        $(newElement).appendTo('.col2of2 ul');
      }
    });

    window.print();
  });

  $("#codes").select2({
    matcher: function(params, text) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return text;
      }

      // Build Regex String
      var matchTerm = '.*';

      // Split all the search terms
      var terms = params.term.split(" ");

      for(var i = 0; i < terms.length; i++) {
          matchTerm += '(?=.*' + terms[i] + '.*)';
      };

      matchTerm += '.*';

      // Convert to Regex
      // => /.*(?=.*TERM1.*)(?=.*TERM2.*).*/
      var matchRegex = new RegExp(matchTerm.toUpperCase());

      if (text.text.toUpperCase().match(matchRegex)) {
        return text;
      }

      return null;
    }
  });
});
