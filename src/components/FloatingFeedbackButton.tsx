import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingFeedbackButtonProps {
  onClick: () => void;
}

export function FloatingFeedbackButton({ onClick }: FloatingFeedbackButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#F59E0B] rounded-full border-2 border-white flex items-center justify-center z-50 shadow-xl hover:shadow-2xl transition-all"
          style={{ fontFamily: 'var(--font-body)' }}
          aria-label="Quick Feedback"
        >
          <MessageSquare className="w-7 h-7 text-white" />
          <motion.span
            className="absolute -top-1 -right-1 w-6 h-6 bg-[#DC2626] rounded-full border-2 border-white flex items-center justify-center text-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}
          >
            !
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
