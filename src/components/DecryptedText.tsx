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

// This needs to be updated if the text wants to be updated.
// A simple script can generate it, if needed
const CACHED_WORDS = ["jyHVLnJV2JwBHbZwZ1TmSnMHQVW",
                      "SdNFVutwPBkT7UaIjNIMGZHYbQp",
                      "Senjyb90w3HmUJOC1zUTtFOEBin",
                      "SecaOd8bfwYDLMfbfakn7ThG4et",
                      "SecuWd1LkwZowJsAK9wQ9SpuYmw",
                      "SecurdI0Im8pV3qUuAtZlMdnlvE",
                      "SecureIFcP1gzwcqxN7EaCtJUBi",
                      "Secure xydproGXf2sL3lIdGTYC",
                      "Secure A7lY0cciGIw4hToM3jjc",
                      "Secure APQf3XwCmkWOiEZ5sTJz",
                      "Secure API4lCXRKoUswwCSY6Ve",
                      "Secure API LYrcwNt8gLs4tXVN",
                      "Secure API PTLP5aTNnrpafdi9",
                      "Secure API Pr8I8aF7WUPK5THu",
                      "Secure API ProqvuP6j3EWczDQ",
                      "Secure API ProxTejlqD7CFrKw",
                      "Secure API ProxyjxT68RyAYYL",
                      "Secure API Proxy qedGajeNu4",
                      "Secure API Proxy Mqume5kReM",
                      "Secure API Proxy MaMYhcdsbi",
                      "Secure API Proxy Manwxw1niA",
                      "Secure API Proxy ManaEi4KHo",
                      "Secure API Proxy Manag2BZFE",
                      "Secure API Proxy Manageby6v",
                      "Secure API Proxy ManagemE3S",
                      "Secure API Proxy ManagemeSK",
                      "Secure API Proxy Managemenq",
                      "Secure API Proxy Management"]
                    

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
  const lastUpdateRef = useRef<number>(-Infinity);
  const currentIndexRef = useRef(0);


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
  const renderedContent = CACHED_WORDS[revealedCount];

  return <span className={className}>{renderedContent}</span>;
}
