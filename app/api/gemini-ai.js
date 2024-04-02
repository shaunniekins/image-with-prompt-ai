import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// gemini-pro-vision (for multi-modal [can't use this])
// gemini-1.0-pro (for text-to-text)
const MODEL_NAME = "gemini-pro-vision";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export async function runChat(imagePrompt, textPrompt, setResponse) {
  // console.log("runchat called");
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  //   const generationConfig = {
  //     temperature: 0.9,
  //     topK: 1,
  //     topP: 1,
  //     maxOutputTokens: 2048,
  //   };

  //   const safetySettings = [
  //     {
  //       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //     },
  //     {
  //       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //     },
  //     {
  //       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //     },
  //     {
  //       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //     },
  //   ];

  //   const chat = model.startChat({
  //     generationConfig,
  //     safetySettings,
  //     history: [],
  //   });

  //   const result = await chat.sendMessage(
  //     textPrompt
  //   );
  //   const response = result.response;
  //   console.log(response.text());

  const prompt = textPrompt;

  //   const imageParts = await Promise.all(
  //     [...imagePrompt].map(fileToGenerativePart)
  //   );

  //   const result = await model.generateContent([prompt, ...imageParts]);
  //   const response = await result.response;
  //   const text = response.text();
  //   console.log(text);
  const imagePart = await fileToGenerativePart(imagePrompt);
  const result = await model.generateContent([prompt, imagePart]);
  //   console.log(result.response.candidates[0].content.parts[0].text);
  setResponse(result.response.candidates[0].content.parts[0].text);
}

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}
