import React, { useState, useEffect, useRef, useCallback } from 'react';

const TypingAnimation = ({ 
  phrases = ["Welcome to ITME"], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 2000,
  className = "",
  style = {},
  cursorColor = "#084c61",
  textColor = "#084c61",
  fontSize = "1.5rem",
  fontFamily = "'Fira Code', monospace, sans-serif",
  responsive = true,
  showCursor = true // Prop to control whether a cursor is shown at all
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // Internal blinking visibility state (separate from the prop that enables cursor)
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  // Responsive font sizes with useCallback to stable reference
  const getResponsiveFontSize = useCallback(() => {
    if (!responsive) return fontSize;
    
    if (window.innerWidth >= 992) return fontSize; // Desktop
    if (window.innerWidth >= 576) return `calc(${fontSize} * 0.8)`; // Tablet
    return `calc(${fontSize} * 0.65)`; // Mobile
  }, [fontSize, responsive]);

  const [responsiveFontSize, setResponsiveFontSize] = useState(getResponsiveFontSize());

  useEffect(() => {
    const handleResize = () => {
      if (responsive) {
        setResponsiveFontSize(getResponsiveFontSize());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveFontSize, responsive]);

  useEffect(() => {
    // Cursor blinking effect - only if cursor enabled via prop
    if (showCursor) {
      intervalRef.current = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500);
    } else {
      setCursorVisible(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showCursor]);

  useEffect(() => {
    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return;
    }

    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (currentText === currentPhrase) {
        setIsPaused(true);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  const containerStyle = {
    fontFamily,
    fontSize: responsiveFontSize,
    color: textColor,
    fontWeight: '500',
    letterSpacing: '0.5px',
    minHeight: '1.2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start', // Center on mobile
    lineHeight: '1.2',
    textAlign: window.innerWidth < 768 ? 'center' : 'left', // Center text on mobile
    width: '100%',
    ...style
  };

  const cursorStyle = {
    display: 'inline-block',
    backgroundColor: cursorColor,
    width: '2px',
    height: '1em',
    marginLeft: '2px',
  opacity: showCursor && cursorVisible ? 1 : 0,
    transition: 'opacity 0.1s ease',
    animation: 'none'
  };

  return (
    <div className={`typing-animation ${className}`} style={containerStyle}>
      <span>{currentText}</span>
  {showCursor && <span style={cursorStyle} aria-hidden="true"></span>}
    </div>
  );
};

export default TypingAnimation;