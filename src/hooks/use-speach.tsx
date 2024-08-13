import { useState } from "react";
import { useSpeech } from "react-text-to-speech"; // Assuming 'use-speech' is the library you're using

function useChangeableSpeech() {
  const [text, setText] = useState<string>("");
  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text, voiceURI: "Google US English", rate: 0.8 });

  return {
    Text,
    text,
    setText,
    speechStatus,
    isInQueue,
    start,
    pause,
    stop,
  };
}

export default useChangeableSpeech;
