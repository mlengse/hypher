var Hypher = require('../lib/hypher'),
    data = require('./data.js'),
    words = data.words,
    language = data.language,
    german = require('./de.js'),
    finnish = require('./fi.js'),
    indonesian = require('../lib/patterns/id.js');

var dictionary = {};

words.forEach(function (word) {
    var w = word.split('-');
    dictionary[w.join('')] = w;
});

describe('hyphenate', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(language);
    });

    Object.keys(dictionary).forEach(function (word) {
        it('should hyphenate "' + word + '" correctly', function () {
            expect(h.hyphenate(word)).toEqual(dictionary[word]);
        });
    });
});

describe('trie', function () {
    var h;
    beforeAll(function () {
        h = new Hypher({
            patterns: {
                "2": "a1b2",
                "3": "a2bb3c"
            }
        });
    });

    it('trie is correctly generated', function () {
        expect(h.trie).toEqual({
            97: {
                _points: [0, "1"],
                98: {
                    _points: [0, "2", 0]
                }
            },
            98: {
                _points: [0, "2"],
                99: {
                    _points: [0, "3", 0]
                }
            },
            _points: []
        });
    });
});

describe('hyphenate with soft hyphens', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(language);
    });

    it('should handle soft hyphen in word', function () {
        expect(h.hyphenate('hyph\u00ADen')).toEqual(['hyph\u00ADen']);
    });
});

describe('hyphenate text with soft hyphens', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(language);
    });

    it('should split text with soft hyphens correctly', function () {
        expect(h.hyphenateText('hyph\u00ADen charact\u00ADer').split('\u00AD')).toEqual(['hyph', 'en charact', 'er']);
    });
});

describe('hyphenate with en-dash, hyphen-minus, hyphen, or ZWNJ', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(language);
    });

    it('should handle hyphen-minus', function () {
        expect(h.hyphenateText('bootstrapping\u002Dbrainstorm-victories').split('\u00AD')).toEqual(['boot', 'strap', 'ping\u002Dbrain', 'storm-vic', 'to', 'ries']);
    });

    it('should handle hyphen', function () {
        expect(h.hyphenateText('bootstrapping\u2010brainstorm-victories').split('\u00AD')).toEqual(['boot', 'strap', 'ping\u2010brain', 'storm-vic', 'to', 'ries']);
    });

    it('should handle en-dash', function () {
        expect(h.hyphenateText('bootstrapping\u2013brainstorm-victories').split('\u00AD')).toEqual(['boot', 'strap', 'ping\u2013brain', 'storm-vic', 'to', 'ries']);
    });

    it('should handle ZWNJ', function () {
        expect(h.hyphenateText('bootstrapping\u200Cbrainstorm-victories').split('\u00AD')).toEqual(['boot', 'strap', 'ping\u200Cbrain', 'storm-vic', 'to', 'ries']);
    });

    it('should handle plain hyphen', function () {
        expect(h.hyphenateText('bootstrapping-brainstorm-victories').split('\u00AD')).toEqual(['boot', 'strap', 'ping-brain', 'storm-vic', 'to', 'ries']);
    });
});

describe('hyphenate, preserve case and punctuation', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(language);
    });

    it('should preserve case', function () {
        expect(h.hyphenate('Hyphenation')).toEqual(['Hy', 'phen', 'ation']);
    });

    it('should handle all punctuation', function () {
        expect(h.hyphenate('!!!!!!!!')).toEqual(['!!!!!!!!']);
    });

    it('should handle word with trailing punctuation', function () {
        expect(h.hyphenate('Hyphenation!')).toEqual(['Hy', 'phen', 'ation!']);
    });
});

describe('hyphenate with exceptions', function () {
    it('should use exceptions', function () {
        var l = Object.create(language);
        l.exceptions = 'bootstrapping, brainstorm';
        var h = new Hypher(l);
        expect(h.hyphenate('bootstrapping')).toEqual(['bootstrapping']);
        expect(h.hyphenate('brainstorm')).toEqual(['brainstorm']);
    });

    it('should use exceptions (mixed case)', function () {
        var l = Object.create(language);
        l.exceptions = 'bootstrapping, brainstorm';
        var h = new Hypher(l);
        expect(h.hyphenate('BoOtstrApPing')).toEqual(['BoOtstrApPing']);
        expect(h.hyphenate('BrainStorm')).toEqual(['BrainStorm']);
    });

    it('should use exceptions (without space)', function () {
        var l = Object.create(language);
        l.exceptions = 'bootstrapping,brainstorm';
        var h = new Hypher(l);
        expect(h.hyphenate('bootstrapping')).toEqual(['bootstrapping']);
        expect(h.hyphenate('brainstorm')).toEqual(['brainstorm']);
    });
});

describe('hyphenate with custom points', function () {
    it('should use custom hyphenation points', function () {
        var l = Object.create(language);
        l.exceptions = 'bo\u2027otstr\u2027apping, brai\u2027nstorm';
        var h = new Hypher(l);
        expect(h.hyphenate('bootstrapping')).toEqual(['bo', 'otstr', 'apping']);
        expect(h.hyphenate('brainstorm')).toEqual(['brai', 'nstorm']);
    });

    it('should return the correct exception', function () {
        var l = Object.create(language);
        l.exceptions = 'inspi\u2027re\u2027rend';
        var h = new Hypher(l);
        expect(h.hyphenate('inspirerend')).toEqual(['inspi', 're', 'rend']);
    });

    it('should use custom hyphenation points with mixed case', function () {
        var l = Object.create(language);
        l.exceptions = 'bo\u2027otstr\u2027apping, brai\u2027nstorm';
        var h = new Hypher(l);
        expect(h.hyphenate('bOotsTrapPing')).toEqual(['bO', 'otsTr', 'apPing']);
        expect(h.hyphenate('BrainStorm')).toEqual(['Brai', 'nStorm']);
    });
});

describe('hyphenates uppercase', function () {
    it('should handle Finnish uppercase', function () {
        var l = Object.create(finnish);
        var h = new Hypher(l);
        expect(h.hyphenateText('LÄHETÄ SÄHKÖPOSTI').split('\u00AD')).toEqual(['LÄ', 'HE', 'TÄ SÄH', 'KÖ', 'POS', 'TI']);
    });
});

describe('hyphenate path like strings', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(language);
    });

    it('should handle URL', function () {
        expect(h.hyphenateText('http://www.ex.com/').split('\u00AD')).toEqual(['http://\u200Bwww.ex.com/']);
    });

    it('should handle URL with path', function () {
        expect(h.hyphenateText('http://www.ex.com/some/file.txt').split('\u00AD')).toEqual(['http://\u200Bwww.ex.com/\u200Bsome/\u200Bfile.txt']);
    });

    it('should handle file path', function () {
        expect(h.hyphenateText('some/path/to/some/where').split('\u00AD')).toEqual(['some/\u200Bpath/\u200Bto/\u200Bsome/\u200Bwhere']);
    });

    it('should handle numeric path', function () {
        expect(h.hyphenateText('1234567/7654321').split('\u00AD')).toEqual(['1234567/\u200B7654321']);
    });

    it('should handle root path', function () {
        expect(h.hyphenateText('/root/for/some/path').split('\u00AD')).toEqual(['/root/\u200Bfor/\u200Bsome/\u200Bpath']);
    });

    it('should handle text with embedded path', function () {
        expect(h.hyphenateText('a text with a /path/in/it/').split('\u00AD')).toEqual(['a text with a /path/\u200Bin/\u200Bit/']);
    });

    it('should handle text with embedded path and more text', function () {
        expect(h.hyphenateText('a text with a /path/in/it/ and more text').split('\u00AD')).toEqual(['a text with a /path/\u200Bin/\u200Bit/ and more text']);
    });
});

describe('hyphenate with special characters', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(german);
    });

    it('should handle German umlauts', function () {
        expect(h.hyphenate('müsse')).toEqual(['müs', 'se']);
    });

    it('should handle German compound words', function () {
        expect(h.hyphenate('sozioökonomisch')).toEqual(['so', 'zio', 'öko', 'no', 'misch']);
    });

    it('should handle German long words', function () {
        expect(h.hyphenate('kostenschätzungen')).toEqual(['kos', 'ten', 'schät', 'zun', 'gen']);
    });
});

describe('hyphenate text with special characters', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(german);
    });

    it('should handle German umlauts in text', function () {
        expect(h.hyphenateText('müsse').split('\u00AD')).toEqual(['müs', 'se']);
    });

    it('should handle German compound words in text', function () {
        expect(h.hyphenateText('sozioökonomisch').split('\u00AD')).toEqual(['so', 'zio', 'öko', 'no', 'misch']);
    });

    it('should handle German long words in text', function () {
        expect(h.hyphenateText('kostenschätzungen').split('\u00AD')).toEqual(['kos', 'ten', 'schät', 'zun', 'gen']);
    });
});

describe('hyphenate Indonesian words', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(indonesian);
    });

    it('should hyphenate "bahasa"', function () {
        expect(h.hyphenate('bahasa')).toEqual(['ba', 'ha', 'sa']);
    });

    it('should hyphenate "indonesia"', function () {
        expect(h.hyphenate('indonesia')).toEqual(['in', 'do', 'ne', 'si', 'a']);
    });

    it('should hyphenate "komputer"', function () {
        expect(h.hyphenate('komputer')).toEqual(['kom', 'pu', 'ter']);
    });

    it('should hyphenate "hyphenation"', function () {
        expect(h.hyphenate('hyphenation')).toEqual(['hyp', 'he', 'na', 'ti', 'on']);
    });
});

describe('hyphenate Indonesian with exceptions', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(indonesian);
    });

    it('should use exceptions for "amerika"', function () {
        expect(h.hyphenate('amerika')).toEqual(['a', 'me', 'ri', 'ka']);
    });

    it('should use exceptions for "angola"', function () {
        expect(h.hyphenate('angola')).toEqual(['a', 'ngo', 'la']);
    });

    it('should use exceptions for "afganistan"', function () {
        expect(h.hyphenate('afganistan')).toEqual(['af', 'ga', 'nis', 'tan']);
    });
});

describe('hyphenate Indonesian text', function () {
    var h;
    beforeAll(function () {
        h = new Hypher(indonesian);
    });

    it('should hyphenate Indonesian sentence', function () {
        expect(h.hyphenateText('Bahasa Indonesia adalah bahasa nasional').split('\u00AD')).toEqual(['Ba', 'ha', 'sa In', 'do', 'ne', 'si', 'a a', 'da', 'lah ba', 'ha', 'sa na', 'si', 'o', 'nal']);
    });
});

describe('fallback regex path (no Intl.Segmenter)', function () {
    var h, originalSegmenter;
    beforeAll(function () {
        originalSegmenter = Intl.Segmenter;
        Intl.Segmenter = undefined;
        h = new Hypher(language);
    });
    afterAll(function () {
        Intl.Segmenter = originalSegmenter;
    });

    it('should handle URL', function () {
        expect(h.hyphenateText('http://www.ex.com/').split('\u00AD')).toEqual(['http://\u200Bwww.ex.com/']);
    });

    it('should handle file path', function () {
        expect(h.hyphenateText('some/path/to/some/where').split('\u00AD')).toEqual(['some/\u200Bpath/\u200Bto/\u200Bsome/\u200Bwhere']);
    });

    it('should handle text with embedded path and more text', function () {
        expect(h.hyphenateText('a text with a /path/in/it/ and more text').split('\u00AD')).toEqual(['a text with a /path/\u200Bin/\u200Bit/ and more text']);
    });

    it('should handle plain hyphen', function () {
        expect(h.hyphenateText('bootstrapping-brainstorm-victories').split('\u00AD')).toEqual(['boot', 'strap', 'ping-brain', 'storm-vic', 'to', 'ries']);
    });

    it('should split text with soft hyphens correctly', function () {
        expect(h.hyphenateText('hyph\u00ADen charact\u00ADer').split('\u00AD')).toEqual(['hyph', 'en charact', 'er']);
    });

    it('should hyphenate Indonesian sentence', function () {
        var hi = new Hypher(indonesian);
        expect(hi.hyphenateText('Bahasa Indonesia adalah bahasa nasional').split('\u00AD')).toEqual(['Ba', 'ha', 'sa In', 'do', 'ne', 'si', 'a a', 'da', 'lah ba', 'ha', 'sa na', 'si', 'o', 'nal']);
    });
});
