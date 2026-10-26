var language = require('./data.js').language;

describe('Ender plugin', function () {
    var mockEnder;
    var extensions;
    var elementExtensions;

    beforeEach(function () {
        extensions = {};
        elementExtensions = {};

        mockEnder = {
            ender: function (obj, elementChain) {
                if (elementChain) {
                    Object.assign(elementExtensions, obj);
                } else {
                    Object.assign(extensions, obj);
                }
            }
        };

        global.document = {};
        global.ender = mockEnder;

        require('../lib/ender.js');
    });

    afterEach(function () {
        delete global.document;
        delete global.ender;
        jest.resetModules();
    });

    it('should register hyphenation language with a string id', function () {
        var pattern = Object.assign({}, language, { id: 'en-us' });
        extensions.registerHyphenationLanguage(pattern);

        var node = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                }
            ]
        };

        var context = [node];
        elementExtensions.hyphenate.call(context, 'en-us');

        expect(node.childNodes[0].nodeValue).toBe('some\u00ADthing');
    });

    it('should register hyphenation language with an array of ids', function () {
        var pattern = Object.assign({}, language, { id: ['en-us', 'en'] });
        extensions.registerHyphenationLanguage(pattern);

        var node1 = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                }
            ]
        };

        var node2 = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                }
            ]
        };

        elementExtensions.hyphenate.call([node1], 'en-us');
        elementExtensions.hyphenate.call([node2], 'en');

        expect(node1.childNodes[0].nodeValue).toBe('some\u00ADthing');
        expect(node2.childNodes[0].nodeValue).toBe('some\u00ADthing');
    });

    it('should only hyphenate text nodes (nodeType 3) and skip non-text nodes', function () {
        var pattern = Object.assign({}, language, { id: 'en-us' });
        extensions.registerHyphenationLanguage(pattern);

        var node = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                },
                {
                    nodeType: 1,
                    nodeValue: 'ignored'
                }
            ]
        };

        elementExtensions.hyphenate.call([node], 'en-us');

        expect(node.childNodes[0].nodeValue).toBe('some\u00ADthing');
        expect(node.childNodes[1].nodeValue).toBe('ignored');
    });

    it('should do nothing if language is not registered', function () {
        var node = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                }
            ]
        };

        elementExtensions.hyphenate.call([node], 'nonexistent');

        expect(node.childNodes[0].nodeValue).toBe('something');
    });
});
