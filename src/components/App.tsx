import { useState, useEffect, useMemo } from "react";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./HashtagList";
import { TFeedbackItem } from "../lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter((item) => item.company === selectedCompany)
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );

  const handleAddToList = async (text: string) => {
    const companyName = text.includes("#")
      ? text
          .split(" ")
          .find((word) => word.includes("#"))!
          .substring(1)
      : "Unknown Company";

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      text: text,
      daysAgo: 0,
    };
    setFeedbackItems([...feedbackItems, newItem]);

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

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

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  useEffect(() => {
    fetchFeedbackItems();
  }, []);
  return (
    <div className="app">
      <Footer />
      <Container
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
