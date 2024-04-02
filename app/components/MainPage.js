"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { runChat } from "../api/gemini-ai";
import LoadingView from "./Loading";
import ImageUploader from "./ImageUploader";
import {
  MdOutlineRestartAlt,
  MdOutlineSearch,
  MdOutlineSend,
} from "react-icons/md";

const MainPageComponent = () => {
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
    <div className="h-screen w-screen bg-sky-500 flex flex-col justify-center items-center overflow-hidden px-5">
      <div className="flex flex-col gap-5 items-center justify-center bg-sky-100 rounded-3xl px-5 py-6 md:py-0 md:h-[35%] md:w-[35%]">
        <div className="w-full flex items-center justify-between">
          {/* <button className="rounded-lg invisible">
            <MdOutlineRestartAlt className="w-6 h-6" />
          </button> */}

          <div className="flex items-center gap-2">
            <Image
              src="/snap-search-logo.jpeg"
              alt="Snap Search Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">Snap Search</h1>
          </div>
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
              <div className="flex items-center justify-center gap-3 bg-zinc-50 rounded-xl px-3 py-2">
                <textarea
                  name="textPrompt"
                  id="textPrompt"
                  placeholder="Enter a query here"
                  rows="1"
                  className="w-full bg-transparent outline-none resize-none"
                  value={textPrompt}
                  onChange={handleTextChange}>
                  {textPrompt}
                </textarea>
                {/* {imagePrompt && textPrompt && ( */}
                <button
                  className="bg-sky-500 text-white py-2 px-3 rounded-xl"
                  onClick={() => {
                    runChat(imagePrompt, textPrompt, setResponse);
                    setProcessing(true);
                  }}>
                  <MdOutlineSend className="w-4 h-4" />
                </button>
                {/* )} */}
              </div>
              <div className={`h-[10rem] md:h-full rounded-xl p-3 bg-zinc-50`}>
                {response ? (
                  <textarea
                    name="response"
                    id="response"
                    className="w-full bg-transparent outline-none resize-none text-sm h-full"
                    value={response}
                    readOnly>
                    {response}
                  </textarea>
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

export default MainPageComponent;
