"use client";

import { useEffect, useState } from "react";
import { runChat } from "../api/gemini-ai";
import LoadingView from "./Loading";

const FirstPageComponent = () => {
  const [imagePrompt, setImagePrompt] = useState(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [response, setResponse] = useState("");

  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (e) => {
    if (e.target.files) {
      //   console.log(e.target.files[0]);
      setImagePrompt(e.target.files[0]);
    }
  };

  const handleTextChange = (e) => {
    if (e.target.value) {
      setTextPrompt(e.target.value);
    }
  };

  useEffect(() => {
    if (response) {
      setProcessing(true);
    }
  }, [response, processing]);

  return (
    <div className="h-screen w-screen bg-sky-500 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-5 items-center justify-center bg-sky-100 rounded-3xl py-10 px-5 w-[35%]">
        <h1 className="text-3xl font-bold pb-8">Query with an image</h1>
        <div
          style={{ gridTemplateColumns: "1fr 3fr" }}
          className="grid items-center justify-center gap-5 w-full">
          <div className="flex flex-col items-start w-full gap-5">
            <label htmlFor="imagePrompt">Upload Image</label>
            <label htmlFor="imagePrompt">Input Query</label>
          </div>
          <div className="flex flex-col items-start w-full gap-5">
            <input
              type="file"
              name="imagePrompt"
              id="imagePrompt"
              accept="image/*"
              onChange={handleFileChange}
            />
            <input
              type="text"
              name="textPrompt"
              id="textPrompt"
              placeholder="Type your question here..."
              className="rounded-xl px-3 py-2"
              value={textPrompt}
              onChange={handleTextChange}
            />
          </div>
        </div>

        <button
          disabled={!imagePrompt || !textPrompt}
          className={`${
            !imagePrompt || !textPrompt
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-sky-500"
          } text-white py-2 px-5 rounded-xl`}
          onClick={() => {
            runChat(imagePrompt, textPrompt, setResponse);
            setImagePrompt(null);
            setTextPrompt("");
          }}>
          Generate answer!
        </button>
      </div>
      <div
        className={`${
          response ? "bg-sky-100" : ""
        } flex flex-col gap-5 rounded-3xl p-5 w-[35%]`}>
        {response ? (
          <p className="text-wrap">{response}</p>
        ) : (
          processing && <LoadingView />
        )}
      </div>
    </div>
  );
};

export default FirstPageComponent;
