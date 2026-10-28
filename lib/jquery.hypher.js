(function ($) {
    $.fn.hyphenate = function (language) {
        const hypher = window['Hypher'];
        const languages = hypher && hypher['languages'];

        if (languages && Object.prototype.hasOwnProperty.call(languages, language)) {
            const langObj = languages[language];
            if (langObj) {
                return this.each(function () {
                    const len = this.childNodes.length;
                    for (let i = 0; i < len; i += 1) {
                        if (this.childNodes[i].nodeType === 3) {
                            this.childNodes[i].nodeValue = langObj.hyphenateText(this.childNodes[i].nodeValue);
                        }
                    }
                });
            }
        }
    };
}(jQuery));
