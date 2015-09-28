$(document).ready(function() {
  $('.button-print').on('click', function() {
    var $selectedChoices = $('.select2-selection__choice');
    var sizeSelected = $selectedChoices.size();
    var split1 = sizeSelected / 3;
    var split2 = split1 * 2;

    // clear col2
    $('.col1of3').html('<ul></ul>');
    $('.col2of3').html('<ul></ul>');
    $('.col3of3').html('<ul></ul>');

    $selectedChoices.each(function(index) {
      var $text = $(this).clone();
      var newElement = $('<li>').append($text.attr('title'));
      if (index < split1) {
        $(newElement).appendTo('.col1of3 ul');
      } else if (index >= split1 && index < split2) {
        $(newElement).appendTo('.col2of3 ul');
      } else {
        $(newElement).appendTo('.col3of3 ul');
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
