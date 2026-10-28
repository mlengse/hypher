!function (doc, $) {
    const Hypher = require('hypher');
    const cache = {};

    $.ender({
        registerHyphenationLanguage: function (pattern) {
            const h = new Hypher(pattern);

            if (typeof pattern.id === 'string') {
                pattern.id = [pattern.id];
            }

            for (let i = 0; i < pattern.id.length; i += 1) {
                cache[pattern.id[i]] = h;
            }
        }
    });

    $.ender({
        hyphenate: function (language) {
            if (Object.prototype.hasOwnProperty.call(cache, language)) {
                const hyphenator = cache[language];
                const len = this.length;

                for (let i = 0; i < len; i += 1) {
                    const nodeLen = this[i].childNodes.length;

                    for (let j = 0; j < nodeLen; j += 1) {
                        if (this[i].childNodes[j].nodeType === 3) {
                            this[i].childNodes[j].nodeValue = hyphenator.hyphenateText(this[i].childNodes[j].nodeValue);
                        }
                    }
                }
            }
        }
    }, true);
}(document, ender);
