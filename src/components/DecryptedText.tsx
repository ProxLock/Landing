import { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export default function DecryptedText({
  text,
  className = '',
  speed = 8,
  delay = 0,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>('');
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?';

  const getRandomChar = () => {
    return charset[Math.floor(Math.random() * charset.length)];
  };

  useEffect(() => {
    // Clear any existing intervals/timeouts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setRevealedCount(0);
    setDisplayText('');

    // Start decryption after delay
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;
      const targetLength = text.length;

      // Update display text with scrambling effect
      intervalRef.current = setInterval(() => {
        if (currentIndex < targetLength) {
          // Build the display text: revealed characters + random chars for remaining
          const revealed = text.slice(0, currentIndex + 1);
          const remaining = text.slice(currentIndex + 1);
          const scrambled = remaining
            .split('')
            .map(() => getRandomChar())
            .join('');
          
          setDisplayText(revealed + scrambled);
          setRevealedCount(currentIndex + 1);
          currentIndex++;
        } else {
          // Decryption complete
          setDisplayText(text);
          setRevealedCount(text.length);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      }, speed);
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayText.split('').map((char, index) => {
        // Character is revealed if its index is less than revealedCount
        const isRevealed = index < revealedCount;
        
        return (
          <span
            key={index}
            className={isRevealed ? 'decrypted-char' : 'encrypting-char'}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

