"use client";

import { useEffect, useState } from "react";
import { runChat } from "../api/gemini-ai";
import LoadingView from "./Loading";
import ImageUploader from "./ImageUploader";
import { MdOutlineRestartAlt } from "react-icons/md";

const FirstPageComponent = () => {
  const [imagePrompt, setImagePrompt] = useState(null);
  const [imagePromptPreview, setImagePromptPreview] = useState(null);

  const [textPrompt, setTextPrompt] = useState("");
  const [response, setResponse] = useState("");

  const [processing, setProcessing] = useState(false);

  // const handleFileChange = async (e) => {
  //   if (e.target.files) {
  //     //   console.log(e.target.files[0]);
  //     setImagePrompt(e.target.files[0]);
  //   }
  // };

  const handleTextChange = (e) => {
    setTextPrompt(e.target.value);
  };

  const resetPrompt = () => {
    setTextPrompt("");
    setImagePrompt(null);
    setImagePromptPreview(null);
    setProcessing(false);
    setResponse("");
  };

  useEffect(() => {
    setResponse("");
    setProcessing(false);
  }, [imagePrompt, textPrompt]);

  return (
    <div className="h-screen w-screen bg-sky-500 flex flex-col justify-center items-center gap-5 overflow-hidden px-5">
      <div className="flex flex-col gap-5 items-center justify-center bg-sky-100 rounded-3xl py-10 px-5 md:w-[35%]">
        <div className="w-full flex items-center justify-between pb-5">
          <button className="rounded-lg invisible">
            <MdOutlineRestartAlt className="w-6 h-6" />
          </button>

          <h1 className="text-3xl font-bold">Snap Search</h1>
          <button className="rounded-lg" onClick={resetPrompt}>
            <MdOutlineRestartAlt className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-5 w-full">
          {/* <div className="flex flex-col items-start w-full gap-5">
            <label htmlFor="imagePrompt">Upload Image</label>
            <label htmlFor="imagePrompt">Input Query</label>
          </div> */}
          <div className="flex flex-col md:flex-row items-center w-full h-full gap-5">
            <ImageUploader
              title="Image"
              setImage={setImagePrompt}
              setPreview={setImagePromptPreview}
              preview={imagePromptPreview}
            />
            <div className="h-full flex flex-col gap-5">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="textPrompt"
                  id="textPrompt"
                  placeholder="Type your question here..."
                  className="rounded-xl px-3 py-2 outline-none bg-zinc-50 w-full"
                  value={textPrompt}
                  onChange={handleTextChange}
                />
                <button
                  disabled={!imagePrompt || !textPrompt}
                  className={`${
                    !imagePrompt || !textPrompt
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-sky-500"
                  } text-white py-2 px-5 rounded-xl`}
                  onClick={() => {
                    runChat(imagePrompt, textPrompt, setResponse);
                    setProcessing(true);
                    // setImagePrompt(null);
                    // setTextPrompt("");
                  }}>
                  Search!
                </button>
              </div>
              <div className={`rounded-xl p-3 bg-zinc-50 h-full overflow-auto`}>
                {response ? (
                  <p className="text-wrap text-sm">{response}</p>
                ) : processing ? (
                  <LoadingView />
                ) : (
                  <p className="h-full text-gray-500 italic flex items-center justify-center text-sm">
                    Result here
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPageComponent;
