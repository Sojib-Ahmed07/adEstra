'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { BOT_NAME, STARTER_CHIPS, ERROR_MESSAGE } from '@/lib/chatbotPersonality'

const WELCOME = `Hey, I'm ${BOT_NAME} 👋 — adEstra's AI sidekick.

Ask me anything about what we do, pricing, or our work. Fair warning: I'm funnier than I look.`

const LIMITED_MESSAGE = `Whoa there — you're faster than my servers. 😅

Give me a minute to catch my breath, then try again. Or if it's urgent, skip the queue:

👉 [Chat with our team on WhatsApp](https://wa.me/8801685655696)`

export default function ChatWidget() {
    const pathname = usePathname()
    const isAdminPage = pathname?.startsWith('/admin')

    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [showChips, setShowChips] = useState(true)

    const scrollRef = useRef(null)
    const inputRef = useRef(null)

    // Ensure a signed session cookie exists (cheap; only runs once per mount)
    useEffect(() => {
        if (isAdminPage) return
        let cancelled = false
        fetch('/api/chat/session', { method: 'GET', credentials: 'same-origin' })
            .catch(() => {
                if (!cancelled) {
                    // Non-fatal: /api/chat will reject if no cookie, and widget shows error.
                }
            })
        return () => {
            cancelled = true
        }
    }, [isAdminPage])

    // Auto scroll to bottom on new messages
    useEffect(() => {
        if (!scrollRef.current) return
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [messages, loading, open])

    // Focus input when panel opens (desktop only)
    useEffect(() => {
        if (open && typeof window !== 'undefined' && window.innerWidth >= 1024) {
            setTimeout(() => inputRef.current?.focus(), 220)
        }
    }, [open])

    if (isAdminPage) return null

    async function sendMessage(text) {
        const trimmed = text.trim()
        if (!trimmed || loading) return

        const nextMessages = [...messages, { role: 'user', content: trimmed }]
        setMessages(nextMessages)
        setInput('')
        setShowChips(false)
        setLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ messages: nextMessages }),
            })

            const data = await res.json().catch(() => ({}))
            let reply = data?.reply

            if (res.status === 429) {
                reply = data?.reply || LIMITED_MESSAGE
            } else if (!reply) {
                reply = ERROR_MESSAGE
            }

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
        } catch {
            setMessages((prev) => [...prev, { role: 'assistant', content: ERROR_MESSAGE }])
        } finally {
            setLoading(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        sendMessage(input)
    }

    function handleChipClick(chip) {
        sendMessage(chip)
    }

    return (
        <>
            {/* FLOATING BUTTON */}
            <motion.button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close chat' : 'Open chat'}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="fixed bottom-5 right-5 z-[99998] flex h-14 w-14 items-center justify-center rounded-full bg-[#22e3ad] text-slate-950 shadow-[0_10px_35px_rgba(34,227,173,0.35)] transition-shadow duration-300 hover:shadow-[0_14px_45px_rgba(34,227,173,0.5)] sm:bottom-6 sm:right-6 sm:h-[58px] sm:w-[58px]"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.18 }}
                        >
                            <X className="h-6 w-6" strokeWidth={2.5} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="bot"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.18 }}
                        >
                            <Bot className="h-6 w-6" strokeWidth={2.2} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!open && (
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-[#22e3ad]/40 animate-ping opacity-30" />
                )}
            </motion.button>

            {/* CHAT PANEL */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="chat-panel"
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-24 right-5 z-[99998] flex w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.20)] sm:bottom-28 sm:right-6"
                        style={{ height: 'min(560px, 78vh)' }}
                    >
                        {/* HEADER */}
                        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-950 px-4 py-3.5 text-white">
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#22e3ad] text-slate-950">
                                <Bot className="h-4.5 w-4.5" strokeWidth={2.4} />
                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
                            </div>
                            <div className="flex-1 leading-tight">
                                <p className="text-[13px] font-bold tracking-tight">{BOT_NAME}</p>
                                <p className="text-[10px] font-medium uppercase tracking-widest text-white/50">
                                    adEstra · AI assistant
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close chat"
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* MESSAGES */}
                        <div
                            ref={scrollRef}
                            data-lenis-prevent
                            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3.5 py-4"
                        >
                            {messages.map((m, i) => (
                                <MessageBubble key={i} role={m.role} content={m.content} />
                            ))}

                            {loading && <TypingBubble />}

                            {showChips && messages.length === 1 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {STARTER_CHIPS.map((chip) => (
                                        <button
                                            key={chip}
                                            type="button"
                                            onClick={() => handleChipClick(chip)}
                                            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* INPUT */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2.5"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask Ade anything…"
                                maxLength={500}
                                disabled={loading}
                                className="min-h-[40px] flex-1 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-950 focus:bg-white disabled:opacity-60"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                aria-label="Send message"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white transition-all duration-200 hover:bg-[#22e3ad] hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Send className="h-4 w-4" strokeWidth={2.5} />
                            </button>
                        </form>

                        <p className="border-t border-slate-100 bg-white px-3.5 py-2 text-center text-[9px] font-medium uppercase tracking-widest text-slate-400">
                            Powered by AI · Replies may be imperfect
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

/* ============ SUBCOMPONENTS ============ */

function renderMessageContent(text) {
    const nodes = []
    const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g
    let lastIndex = 0
    let match
    let key = 0

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index))
        }

        const label = match[1] || match[3]
        const url = match[2] || match[3]

        nodes.push(
            <a
                key={`link-${key++}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-700 underline decoration-teal-400 decoration-2 underline-offset-2 transition-colors hover:text-teal-900 hover:decoration-teal-600"
            >
                {label}
            </a>
        )

        lastIndex = pattern.lastIndex
    }

    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex))
    }

    return nodes.length ? nodes : text
}

function MessageBubble({ role, content }) {
    const isUser = role === 'user'
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${isUser
                        ? 'rounded-br-md bg-slate-950 text-white'
                        : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
                    }`}
            >
                {isUser ? content : renderMessageContent(content)}
            </div>
        </motion.div>
    )
}

function TypingBubble() {
    return (
        <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-3">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                        }}
                        className="block h-1.5 w-1.5 rounded-full bg-slate-400"
                    />
                ))}
            </div>
        </div>
    )
}