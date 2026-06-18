'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MessageCircle, BookOpen, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bottom-cta"
        >
          <a
            href="https://wa.me/972500000000"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            וואטסאפ
          </a>
          <Link
            href="/catalog"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            קטלוג
          </Link>
          <Link href="/contact" className="btn-gold text-xs py-2 px-4 rounded-full">
            <FileText className="w-3.5 h-3.5" />
            הצעת מחיר
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
