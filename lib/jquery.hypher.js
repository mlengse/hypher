(function ($) {
    $.fn.hyphenate = function (language) {
        var hypher = window['Hypher'];
        var languages = hypher && hypher['languages'];

        if (languages && Object.prototype.hasOwnProperty.call(languages, language)) {
            var langObj = languages[language];
            if (langObj) {
                return this.each(function () {
                    var i = 0, len = this.childNodes.length;
                    for (; i < len; i += 1) {
                        if (this.childNodes[i].nodeType === 3) {
                            this.childNodes[i].nodeValue = langObj.hyphenateText(this.childNodes[i].nodeValue);
                        }
                    }
                });
            }
        }
    };
}(jQuery));
