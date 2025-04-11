import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { TFeedbackItem } from "./types";

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      "useFeedbackItemsContent must be used within a FeedbackItemsContextProvider"
    );
  }
  return context;
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();

        setFeedbackItems(data.feedbacks);
      } catch (e) {
        console.error(e);
        setErrorMessage("Error fetching feedback items");
      }
      setIsLoading(false);
    };
    fetchFeedbackItems();
  }, []);
  return {
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
    setIsLoading,
    setErrorMessage,
  };
}
