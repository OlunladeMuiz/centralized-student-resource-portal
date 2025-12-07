import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Stars, Sparkles } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed top-6 right-6 z-50 w-20 h-20 rounded-full overflow-hidden border-4 border-[#0F172A] dark:border-white shadow-2xl"
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Background gradient */}
      <motion.div
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-[#0F172A] via-purple-900 to-blue-900'
            : 'bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300'
        }`}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Animated stars for dark mode */}
      <AnimatePresence>
        {isDark && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 60 - 30,
                  y: Math.random() * 60 - 30,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Sun rays for light mode */}
      <AnimatePresence>
        {!isDark && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="absolute top-1/2 left-1/2 w-1 h-8 bg-yellow-200 origin-center"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-20px)`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main icon */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Moon className="w-10 h-10 text-yellow-200 fill-yellow-200" />
              {/* Crescent shadow */}
              <motion.div
                className="absolute top-0 right-0 w-6 h-10 bg-[#0F172A] rounded-full"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sun className="w-10 h-10 text-orange-600 fill-orange-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 ${
          isDark ? 'bg-purple-500' : 'bg-yellow-400'
        } blur-xl opacity-40`}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Particles */}
      <AnimatePresence>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{
              opacity: [0, 1, 0],
              y: -40,
              scale: [1, 0.5, 0],
              x: (i - 1) * 15,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className={`absolute bottom-0 left-1/2 w-2 h-2 rounded-full ${
              isDark ? 'bg-purple-400' : 'bg-orange-400'
            }`}
          />
        ))}
      </AnimatePresence>

      {/* Border animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark
            ? 'conic-gradient(from 0deg, transparent, #8B5CF6, transparent)'
            : 'conic-gradient(from 0deg, transparent, #F59E0B, transparent)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.button>
  );
}