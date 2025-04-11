import { useState } from "react";
import { TFeedbackItem } from "./types";

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return {
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
    setIsLoading,
    setErrorMessage,
  };
}
