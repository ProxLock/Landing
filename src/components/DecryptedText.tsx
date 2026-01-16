import { useState, useEffect, useRef, useMemo } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

// Use only alphanumeric chars for consistent widths in monospace fonts
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHARSET_LENGTH = CHARSET.length;

const getRandomChar = () => CHARSET[(Math.random() * CHARSET_LENGTH) | 0];

// Split text into words (preserving spaces as separate tokens)
function tokenizeText(text: string): { word: string; startIndex: number }[] {
  const tokens: { word: string; startIndex: number }[] = [];
  let currentWord = '';
  let wordStart = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') {
      if (currentWord) {
        tokens.push({ word: currentWord, startIndex: wordStart });
        currentWord = '';
      }
      tokens.push({ word: ' ', startIndex: i });
    } else {
      if (!currentWord) {
        wordStart = i;
      }
      currentWord += char;
    }
  }
  if (currentWord) {
    tokens.push({ word: currentWord, startIndex: wordStart });
  }
  return tokens;
}

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
  const lastUpdateRef = useRef<number>(-Infinity);
  const currentIndexRef = useRef(0);

  // Tokenize text into words for word-based wrapping
  const tokens = useMemo(() => tokenizeText(text), [text]);

  useEffect(() => {
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
    setScrambleKey(prev => prev + 1);
    currentIndexRef.current = 0;
    lastUpdateRef.current = -Infinity;

    const targetLength = text.length;
    if (targetLength === 0) return cleanup;

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= speed) {
        lastUpdateRef.current = timestamp;

        if (currentIndexRef.current < targetLength) {
          currentIndexRef.current++;
          setRevealedCount(currentIndexRef.current);
          setScrambleKey(k => k + 1);
        } else {
          return;
        }
      }

      if (currentIndexRef.current < targetLength) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    timeoutRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return cleanup;
  }, [text, speed, delay]);

  // Render words with nowrap to prevent mid-word breaks
  const renderedContent = useMemo(() => {
    return tokens.map((token, tokenIndex) => {
      const { word, startIndex } = token;

      // Space tokens - just render a space
      if (word === ' ') {
        return <span key={tokenIndex}> </span>;
      }

      // Word tokens - wrap in nowrap span
      const chars = word.split('').map((char, charIndex) => {
        const globalIndex = startIndex + charIndex;
        const isRevealed = globalIndex < revealedCount;
        const displayChar = isRevealed ? char : getRandomChar();

        return (
          <span
            key={charIndex}
            className={isRevealed ? 'decrypted-char' : 'encrypting-char'}
            style={{ display: 'inline-block' }}
          >
            {displayChar}
          </span>
        );
      });

      return (
        <span key={tokenIndex} style={{ whiteSpace: 'nowrap' }}>
          {chars}
        </span>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, revealedCount, scrambleKey]);

  return <span className={className}>{renderedContent}</span>;
}
