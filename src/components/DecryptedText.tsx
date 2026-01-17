import { useState, useEffect, useRef } from 'react';

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
const CACHED_WORDS = ["jyHVLn​JV2J​wBHbZw​Z1TmSnMHQVW",
                      "SdNFVu​twPB​kT7UaI​jNIMGZHYbQp",
                      "Senjyb​90w3​HmUJOC​1zUTtFOEBin",
                      "SecaOd​8bfw​YDLMfb​fakn7ThG4et",
                      "SecuWd​1Lkw​ZowJsA​K9wQ9SpuYmw",
                      "Securd​I0Im​8pV3qU​uAtZlMdnlvE",
                      "Secure​IFcP​1gzwcq​xN7EaCtJUBi",
                      "Secure​ xyd​proGXf​2sL3lIdGTYC",
                      "Secure​ A7l​Y0cciG​Iw4hToM3jjc",
                      "Secure​ APQ​f3XwCm​kWOiEZ5sTJz",
                      "Secure​ API​4lCXRK​oUswwCSY6Ve",
                      "Secure​ API​ LYrcw​Nt8gLs4tXVN",
                      "Secure​ API​ PTLP5​aTNnrpafdi9",
                      "Secure​ API​ Pr8I8​aF7WUPK5THu",
                      "Secure​ API​ Proqv​uP6j3EWczDQ",
                      "Secure​ API​ ProxT​ejlqD7CFrKw",
                      "Secure​ API​ Proxy​jxT68RyAYYL",
                      "Secure​ API​ Proxy​ qedGajeNu4",
                      "Secure​ API​ Proxy​ Mqume5kReM",
                      "Secure​ API​ Proxy​ MaMYhcdsbi",
                      "Secure​ API​ Proxy​ Manwxw1niA",
                      "Secure​ API​ Proxy​ ManaEi4KHo",
                      "Secure​ API​ Proxy​ Manag2BZFE",
                      "Secure​ API​ Proxy​ Manageby6v",
                      "Secure​ API​ Proxy​ ManagemE3S",
                      "Secure​ API​ Proxy​ ManagemeSK",
                      "Secure​ API​ Proxy​ Managemenq",
                      "Secure​ API​ Proxy​ Management"]
                    



export default function DecryptedText({
  text,
  className = '',
  speed = 8,
  delay = 0,
}: DecryptedTextProps) {
  const [revealedCount, setRevealedCount] = useState(0);
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
