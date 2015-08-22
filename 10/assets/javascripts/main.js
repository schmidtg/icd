$(document).ready(function() {
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
