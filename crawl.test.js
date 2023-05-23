const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL deCapitalize', ()=>{
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', ()=>{
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', ()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://dushyanth.in/">Dushyanth Website</a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://dushyanth.in'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://dushyanth.in/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', ()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/resume/">Dushyanth Website</a>
        </body>
    <html>
    `
    const inputBaseURL = 'https://dushyanth.in'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://dushyanth.in/resume/']
    expect(actual).toEqual(expected)
})