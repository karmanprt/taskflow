import { useEffect, useState } from "react";

function TypewriterHeading({ text, speed = 75, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let intervalId;
    let timeoutId;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Show the complete heading when reduced motion is enabled
    if (prefersReducedMotion) {
      timeoutId = window.setTimeout(() => {
        setDisplayedText(text);
        setIsComplete(true);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    // Reveal one character at a time
    intervalId = window.setInterval(() => {
      currentIndex += 1;

      setDisplayedText(text.slice(0, currentIndex));

      if (currentIndex >= text.length) {
        window.clearInterval(intervalId);
        setIsComplete(true);
      }
    }, speed);

    // Clean up the interval when the component unmounts
    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [text, speed]);

  return (
    <h1 className={className} aria-label={text} aria-live="off">
      <span aria-hidden="true">{displayedText}</span>

      {!isComplete && (
        <span className="typewriter-cursor" aria-hidden="true">
          |
        </span>
      )}
    </h1>
  );
}

export default TypewriterHeading;
