// lib/siteKnowledge.js
// Builds Ade's knowledge from LIVE database content — services, team, portfolio, blog.
// Anything the admin adds/edits in the dashboard is picked up automatically
// (within CACHE_TTL_MS), no code changes needed.
//
// Two layers so the prompt stays small (Groq's free tier has a tight tokens-per-minute cap):
//   1. INDEX   — a compact line for EVERY item (always sent), so Ade knows what exists.
//   2. DETAILS — full text only for the few items most relevant to the visitor's question.
//
// NOTE: deliberately NOT a 'use server' file — functions in those files become
// publicly callable server actions.

import connectToDatabase from '@/lib/mongoose'
import Service from '@/models/Service'
import TeamMember from '@/models/TeamMember'
import Portfolio from '@/models/Portfolio'
import Post from '@/models/Post'
import Category from '@/models/Category' // registers the model for .populate('category')

/* =========================================================
   CONFIG
   ========================================================= */

const SITE_URL = 'https://adestrasolutions.com'
const CACHE_TTL_MS = 2 * 60 * 1000 // new admin content shows up within ~2 minutes

const LIMITS = {
    SERVICES: 30,
    TEAM: 30,
    PORTFOLIO: 40,
    POSTS: 60, // latest N posts in the index
    DETAILED_POSTS: 2, // full-ish text for the top N relevant posts
    DETAILED_PORTFOLIO: 2,
    DETAILED_SERVICES: 2,
    POST_BODY_CHARS: 1200,
    MAX_CONTEXT_CHARS: 9000, // default cap on the dynamic block (~2.3k tokens)
}

/* =========================================================
   HELPERS
   ========================================================= */

const clean = (s, max = 240) =>
    String(s || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, max)

const stripHtml = (html) =>
    String(html || '')
        .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim()

const list = (arr, max = 6, pick = (x) => x) =>
    (Array.isArray(arr) ? arr : [])
        .map(pick)
        .filter(Boolean)
        .slice(0, max)
        .join(' | ')

const date = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '')

const STOPWORDS = new Set(
    'a an the and or but is are was were be to of in on for with about at by from your you me my i we our us do does did can could would should what which who how when where why tell show give any some this that these those it its have has please more info'.split(
        ' '
    )
)

function keywords(text) {
    return [
        ...new Set(
            String(text || '')
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, ' ')
                .split(/\s+/)
                .filter((w) => w.length > 2 && !STOPWORDS.has(w))
        ),
    ]
}

// Simple keyword relevance: title hits count triple.
function score(words, title, body) {
    if (!words.length) return 0
    const t = title.toLowerCase()
    const b = body.toLowerCase()
    let s = 0
    for (const w of words) {
        if (t.includes(w)) s += 3
        if (b.includes(w)) s += 1
    }
    return s
}

function topMatches(items, words, n, toText) {
    return items
        .map((it) => ({ it, s: score(words, it.title || it.name || '', toText(it)) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, n)
        .map((x) => x.it)
}

/* =========================================================
   DATA LOAD (cached per server instance)
   ========================================================= */

let cache = { at: 0, data: null }

async function loadSiteData() {
    if (cache.data && Date.now() - cache.at < CACHE_TTL_MS) return cache.data

    await connectToDatabase()
    void Category // keep import (needed for populate)

    const [services, team, portfolio, posts] = await Promise.all([
        Service.find({ published: true })
            .sort({ order: 1, createdAt: -1 })
            .limit(LIMITS.SERVICES)
            .select('-heroIconImage -coverImage')
            .lean()
            .catch((e) => (console.error('[knowledge] services:', e), [])),
        TeamMember.find({})
            .sort({ order: 1, createdAt: 1 })
            .limit(LIMITS.TEAM)
            .select('name role bio experience skills')
            .lean()
            .catch((e) => (console.error('[knowledge] team:', e), [])),
        Portfolio.find({})
            .sort({ featured: -1, createdAt: -1 })
            .limit(LIMITS.PORTFOLIO)
            .select('-coverImage -galleryImages')
            .lean()
            .catch((e) => (console.error('[knowledge] portfolio:', e), [])),
        Post.find({})
            .sort({ createdAt: -1 })
            .limit(LIMITS.POSTS)
            .select('title slug excerpt content category tags createdAt')
            .populate('category', 'name slug')
            .lean()
            .catch((e) => (console.error('[knowledge] posts:', e), [])),
    ])

    // Pre-strip blog HTML once, not on every request
    for (const p of posts) p.plain = stripHtml(p.content)

    const data = { services, team, portfolio, posts }
    cache = { at: Date.now(), data }
    return data
}

// Call from admin mutations if you want instant updates on that instance
export function clearSiteKnowledgeCache() {
    cache = { at: 0, data: null }
}

/* =========================================================
   FORMATTERS
   ========================================================= */

const serviceText = (s) =>
    [s.shortDescription, s.heroIntro, list(s.offerCards, 8, (c) => `${c.title} ${c.description}`)].join(' ')

const portfolioText = (p) =>
    [p.client, p.industry, p.projectType, p.category, p.background, list(p.results, 6)].join(' ')

const postText = (p) => [p.excerpt, p.category?.name, list(p.tags, 10), p.plain].join(' ')

function serviceIndex(s) {
    return [
        `• ${s.title} — ${SITE_URL}/services/${s.slug}`,
        s.shortDescription || s.heroIntro ? `  ${clean(s.shortDescription || s.heroIntro, 200)}` : '',
        s.offerCards?.length ? `  Offers: ${list(s.offerCards, 6, (c) => c?.title)}` : '',
    ]
        .filter(Boolean)
        .join('\n')
}

function serviceDetail(s) {
    const cards = (s.offerCards || [])
        .slice(0, 6)
        .map((c) =>
            [
                `  - ${c.title}: ${clean(c.description, 200)}`,
                c.points?.length ? `    Includes: ${list(c.points, 6)}` : '',
            ]
                .filter(Boolean)
                .join('\n')
        )
        .join('\n')
    return [
        `### ${s.title} (${SITE_URL}/services/${s.slug})`,
        s.heroIntro ? `Intro: ${clean(s.heroIntro, 400)}` : '',
        cards ? `What's included:\n${cards}` : '',
        s.whyChoose?.length ? `Why us: ${list(s.whyChoose, 5, (w) => w?.title)}` : '',
    ]
        .filter(Boolean)
        .join('\n')
}

function teamLine(m) {
    return [
        `• ${m.name} — ${m.role}`,
        m.experience ? ` (${clean(m.experience, 60)})` : '',
        m.skills?.length ? `. Skills: ${list(m.skills, 6)}` : '',
        m.bio ? `. ${clean(m.bio, 160)}` : '',
    ].join('')
}

function portfolioIndex(p) {
    return `• ${p.title} — ${p.projectType || p.category}, ${p.industry} (client: ${p.client}) — ${SITE_URL}/portfolio/${p.slug}`
}

function portfolioDetail(p) {
    return [
        `### ${p.title} (${SITE_URL}/portfolio/${p.slug})`,
        `Client: ${p.client} | Industry: ${p.industry} | Type: ${p.projectType} | Duration: ${p.duration}`,
        p.websiteUrl ? `Live site: ${p.websiteUrl}` : '',
        p.background ? `Background: ${clean(p.background, 400)}` : '',
        p.objectives?.length ? `Objectives: ${list(p.objectives, 5)}` : '',
        p.results?.length ? `Results: ${list(p.results, 5)}` : '',
    ]
        .filter(Boolean)
        .join('\n')
}

function postIndex(p) {
    return `• "${p.title}" [${p.category?.name || 'General'}] ${date(p.createdAt)} — ${SITE_URL}/blog/${p.slug}`
}

function postDetail(p) {
    return [
        `### "${p.title}" (${SITE_URL}/blog/${p.slug})`,
        `Category: ${p.category?.name || 'General'} | Published: ${date(p.createdAt)}${p.tags?.length ? ` | Tags: ${list(p.tags, 6)}` : ''
        }`,
        `Summary: ${clean(p.excerpt, 300)}`,
        `Content: ${clean(p.plain, LIMITS.POST_BODY_CHARS)}${p.plain.length > LIMITS.POST_BODY_CHARS ? '…' : ''}`,
    ].join('\n')
}

/* =========================================================
   PUBLIC: build the dynamic knowledge block
   ========================================================= */

/**
 * @param {string} query  recent user text, used to pick which items get full details
 * @param {{ maxChars?: number }} [opts]  smaller cap for providers with tight token limits (Groq)
 */
export async function buildSiteKnowledge(query = '', opts = {}) {
    const maxChars = opts.maxChars || LIMITS.MAX_CONTEXT_CHARS
    let data
    try {
        data = await loadSiteData()
    } catch (err) {
        console.error('[knowledge] load failed:', err)
        return '' // fail soft — Ade still has the static context
    }

    const { services, team, portfolio, posts } = data
    const words = keywords(query)
    const sections = []

    if (services.length) {
        sections.push(`OUR SERVICES (live)\n${services.map(serviceIndex).join('\n')}`)
    }

    if (team.length) {
        sections.push(
            `OUR TEAM (live, ${team.length} people — page: ${SITE_URL}/team)\n${team.map(teamLine).join('\n')}`
        )
    }

    if (portfolio.length) {
        sections.push(
            `OUR PORTFOLIO / CASE STUDIES (live — page: ${SITE_URL}/portfolio)\n${portfolio
                .map(portfolioIndex)
                .join('\n')}`
        )
    }

    if (posts.length) {
        const cats = [...new Set(posts.map((p) => p.category?.name).filter(Boolean))]
        sections.push(
            `OUR BLOG (live, latest ${posts.length} posts — page: ${SITE_URL}/blog)\nCategories: ${cats.join(
                ', '
            )}\n${posts.map(postIndex).join('\n')}`
        )
    }

    // Relevant details for THIS question
    const details = [
        ...topMatches(services, words, LIMITS.DETAILED_SERVICES, serviceText).map(serviceDetail),
        ...topMatches(portfolio, words, LIMITS.DETAILED_PORTFOLIO, portfolioText).map(portfolioDetail),
        ...topMatches(posts, words, LIMITS.DETAILED_POSTS, postText).map(postDetail),
    ]
    // Details go FIRST so the length cap can never cut them off
    if (details.length) {
        sections.unshift(`DETAILS RELEVANT TO THE CURRENT QUESTION\n${details.join('\n\n')}`)
    }

    let block = sections.join('\n\n')
    if (block.length > maxChars) {
        block = block.slice(0, maxChars) + '\n…(truncated)'
    }
    return block ? `\n\n${block}\n` : ''
}