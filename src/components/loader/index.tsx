import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MonetaLoaderProps {
  theme?: 'light' | 'dark';
  onLoadingComplete?: () => void;
  duration?: number;
}

const MonetaLoader: React.FC<MonetaLoaderProps> = ({
  theme = 'dark',
  onLoadingComplete,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  const bgColor = theme === 'dark' ? '#0e0e0e' : '#ffffff';
  const textColor = theme === 'dark' ? '#ffffff' : '#0e0e0e';

  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 1,
    },
    visible: {
      scale: [0, 1, 3],
      opacity: [1, 1, 1],
      transition: {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        times: [0, 0.5, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.8 + i * 0.08,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(10px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const letters = 'MONETA'.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute rounded-full"
              style={{
                width: '150vmax',
                height: '150vmax',
                backgroundColor: textColor,
              }}
            />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 flex items-center justify-center"
            >
              <div className="flex space-x-2">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="font-light tracking-[0.2em]"
                    style={{
                      fontSize: '2rem',
                      color: bgColor,
                      fontWeight: 300,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Loader: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showLoader, setShowLoader] = useState(true);

  const handleLoadingComplete = () => {
    console.log('Loading complete!');
  };

  const resetLoader = () => {
    setShowLoader(false);
    setTimeout(() => setShowLoader(true), 100);
  };

  return (
    <div className="relative min-h-screen">
      {showLoader && (
        <MonetaLoader
          theme={theme}
          onLoadingComplete={handleLoadingComplete}
          duration={3000}
        />
      )}
    </div>
  );
};

export default Loader;