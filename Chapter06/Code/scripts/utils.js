module.exports = (function () {
    'use strict';
    
    return {
        getQueryParams: function () {
            var qs = document.location.search.split('+').join(' '),
                params = {},
                tokens,
                regex = /[?&]?([^=]+)=([^&]*)/g;

            tokens = regex.exec(qs);
            while (tokens) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
                tokens = regex.exec(qs);
            }

            return params;
        }
    };
})();