import { useState, useEffect, useRef, useMemo } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

// Move constants outside component to avoid recreation
// Use only alphanumeric chars for consistent widths in monospace fonts
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHARSET_LENGTH = CHARSET.length;

// Pre-compute random char function outside component
const getRandomChar = () => CHARSET[(Math.random() * CHARSET_LENGTH) | 0];

export default function DecryptedText({
  text,
  className = '',
  speed = 8,
  delay = 0,
}: DecryptedTextProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [scrambleKey, setScrambleKey] = useState(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUpdateRef = useRef<number>(-Infinity); // Start with -Infinity so first frame triggers immediately
  const currentIndexRef = useRef(0);

  // Memoize character array to avoid splitting on every render
  const characters = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    // Cleanup function
    const cleanup = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    cleanup();
    setRevealedCount(0);
    setScrambleKey(prev => prev + 1); // Trigger initial scramble render
    currentIndexRef.current = 0;
    lastUpdateRef.current = -Infinity; // Reset to -Infinity for immediate first frame

    const targetLength = text.length;
    if (targetLength === 0) return cleanup;

    // Animation loop using requestAnimationFrame with throttling
    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= speed) {
        lastUpdateRef.current = timestamp;

        if (currentIndexRef.current < targetLength) {
          currentIndexRef.current++;
          setRevealedCount(currentIndexRef.current);
          setScrambleKey(k => k + 1); // Trigger re-render for scramble effect
        } else {
          // Animation complete
          return;
        }
      }

      if (currentIndexRef.current < targetLength) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation after delay (if delay is 0, still use setTimeout to batch with React rendering)
    timeoutRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return cleanup;
  }, [text, speed, delay]);

  // Memoize the rendered spans to avoid recreating on every scramble
  const renderedContent = useMemo(() => {
    return characters.map((char, index) => {
      const isRevealed = index < revealedCount;
      // Preserve spaces exactly, generate random for other unrevealed chars
      const displayChar = char === ' ' ? ' ' : (isRevealed ? char : getRandomChar());
      // Use inline-block to prevent layout shifts
      const style: React.CSSProperties = {
        display: 'inline-block',
        // Use ch unit for consistent monospace character width
        minWidth: char === ' ' ? '0.25em' : undefined,
      };

      return (
        <span
          key={index}
          className={isRevealed || char === ' ' ? 'decrypted-char' : 'encrypting-char'}
          style={style}
        >
          {displayChar}
        </span>
      );
    });
    // scrambleKey forces re-render for the scramble effect on unrevealed chars
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters, revealedCount, scrambleKey]);

  return <span className={className}>{renderedContent}</span>;
}

