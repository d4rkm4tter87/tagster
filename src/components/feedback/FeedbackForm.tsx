import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState<string>("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);
  const charCount = MAX_CHARACTERS - text.length;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === "") {
      return;
    }
    if (text.includes("#") && text.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 2000);
      return;
    }
    onAddToList(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
    >
      <textarea
        id="feedback-textarea"
        placeholder="-"
        spellCheck={false}
        value={text}
        onChange={handleChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your tag here, remember to #hashtag
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
