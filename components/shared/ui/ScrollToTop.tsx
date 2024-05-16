'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsVisible(scrollTop > 200)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  }

  return (
    <motion.button
      variants={buttonVariants}
      animate={isVisible ? 'visible' : 'hidden'}
      initial='hidden'
      onClick={handleClick}
      className='fixed right-5 bottom-5 z-10 bg-dark/50 rounded-full p-1 shadow-black'
    >
      <ArrowUp className='text-white' />
    </motion.button>
  )
}
