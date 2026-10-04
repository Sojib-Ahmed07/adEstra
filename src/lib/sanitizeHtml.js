// lib/sanitizeHtml.js
// Cleans blog HTML so it can be rendered safely with dangerouslySetInnerHTML.
// Keeps normal formatting (headings, paragraphs, lists, links, images, tables, code)
// and removes anything that can run code (<script>, onclick=, javascript: links, iframes…).
import xss from 'xss'

const { FilterXSS, getDefaultWhiteList } = xss

// Start from the library's safe default list and also allow class + id on every tag
const whiteList = getDefaultWhiteList()
for (const tag of Object.keys(whiteList)) {
    whiteList[tag] = [...new Set([...(whiteList[tag] || []), 'class', 'id'])]
}

const filter = new FilterXSS({
    whiteList,
    stripIgnoreTag: true, // drop tags that aren't allowed (keep their text)
    stripIgnoreTagBody: ['script', 'style', 'iframe', 'object', 'embed'], // drop these completely
})

export function sanitizeHtml(html) {
    if (!html || typeof html !== 'string') return ''
    return filter.process(html)
}

export default sanitizeHtml