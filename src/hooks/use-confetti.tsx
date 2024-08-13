import { useState, useCallback } from "react";

const useConfetti = (duration = 4000) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const startConfetti = useCallback(() => {
    setIsPlaying(true);

    setTimeout(() => {
      setIsPlaying(false);
    }, duration);
  }, [duration]);

  const stopConfetti = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    startConfetti,
    stopConfetti,
  };
};

export default useConfetti;
