const Hypher = require('../lib/hypher.js');
const language = require('./data.js').language;

describe('jQuery plugin', function () {
    let mockJQuery;

    beforeEach(function () {
        mockJQuery = function (selector) {
            return mockJQuery.fn;
        };
        mockJQuery.fn = {};

        global.window = {
            Hypher: {
                languages: {}
            }
        };
        global.jQuery = mockJQuery;

        // Load jquery.hypher.js plugin
        require('../lib/jquery.hypher.js');
    });

    afterEach(function () {
        delete global.window;
        delete global.jQuery;
        jest.resetModules();
    });

    it('should hyphenate elements for a registered language', function () {
        const h = new Hypher(language);
        global.window.Hypher.languages['en-us'] = h;

        const node = {
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

        const context = [node];
        context.each = function (callback) {
            for (let i = 0; i < this.length; i += 1) {
                callback.call(this[i]);
            }
            return this;
        };

        const result = mockJQuery.fn.hyphenate.call(context, 'en-us');

        expect(result).toBe(context);
        expect(node.childNodes[0].nodeValue).toBe('some\u00ADthing');
        expect(node.childNodes[1].nodeValue).toBe('ignored');
    });

    it('should do nothing if language is not registered', function () {
        const node = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                }
            ]
        };

        const context = [node];
        context.each = jest.fn();

        const result = mockJQuery.fn.hyphenate.call(context, 'nonexistent');

        expect(result).toBeUndefined();
        expect(context.each).not.toHaveBeenCalled();
        expect(node.childNodes[0].nodeValue).toBe('something');
    });

    it('should do nothing if prototype property name is passed as language', function () {
        const node = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                }
            ]
        };

        const context = [node];
        context.each = jest.fn();

        const result = mockJQuery.fn.hyphenate.call(context, 'toString');

        expect(result).toBeUndefined();
        expect(context.each).not.toHaveBeenCalled();
        expect(node.childNodes[0].nodeValue).toBe('something');
    });
});
