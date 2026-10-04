// app/actions/chatbot.js
'use server'

import { getPublishedServices } from '@/app/actions/services'

/**
 * Build the full context string for Ade:
 *   STATIC_CONTEXT (business facts) + compact summary of live services from DB.
 * Called by /api/chat on every request (cheap Mongo read, cached connection).
 */
export async function buildChatbotContext() {
    const { STATIC_CONTEXT } = await import('@/lib/chatbotContext')

    let serviceBlock = ''

    try {
        const services = await getPublishedServices()

        if (services && services.length > 0) {
            const lines = services.map((s) => {
                const one = (s.shortDescription || s.heroIntro || '').trim().slice(0, 220)

                const offerings = Array.isArray(s.offerCards)
                    ? s.offerCards
                        .map((c) => c?.title)
                        .filter(Boolean)
                        .slice(0, 6)
                        .join(' | ')
                    : ''

                const why = Array.isArray(s.whyChoose)
                    ? s.whyChoose
                        .map((w) => w?.title)
                        .filter(Boolean)
                        .slice(0, 5)
                        .join(' | ')
                    : ''

                return [
                    `• ${s.title} (slug: ${s.slug})`,
                    one ? `  One-liner: ${one}` : '',
                    offerings ? `  Offers: ${offerings}` : '',
                    why ? `  Why us: ${why}` : '',
                ]
                    .filter(Boolean)
                    .join('\n')
            })

            serviceBlock = `\n\nOUR LIVE SERVICES (current, from our database)\n${lines.join('\n\n')}\n`
        }
    } catch (err) {
        console.error('[chatbot] failed to load services for context:', err)
        // Fail soft — Ade still works with static context only.
    }

    return STATIC_CONTEXT + serviceBlock
}