var utils = (function () {
    return {
        getQueryParams: function () {
            var qs = document.location.search.split('+').join(' '),
                params = {},
                tokens,
                regex = /[?&]?([^=]+)=([^&]*)/g;

            while (tokens = regex.exec(qs)) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }

            return params;
        }
    };
})();