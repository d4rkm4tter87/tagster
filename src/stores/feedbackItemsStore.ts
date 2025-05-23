import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

import { datax } from "./data";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",

  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },
  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
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
    set((state) => ({
      feedbackItems: [newItem, ...state.feedbackItems],
    }));

    /*await fetch("feedbacks.json", {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });*/
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
    }));
    /*
    try {
      const response = await fetch("feedbacks.json");
      if (!response.ok) {
        throw new Error();
      }

      set(() => ({
        feedbackItems: datax,
      }));
    } catch (e) {
      console.error(e);
      set(() => ({
        errorMessage: "Error fetching feedback items",
      }));
    }
    */
    set(() => ({
      feedbackItems: datax,
    }));
    set(() => ({
      isLoading: false,
    }));
  },
}));
