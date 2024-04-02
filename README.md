# Snap Search

Snap Search is a multi-modal search application that allows users to search using both text and images. It utilizes the Google Generative AI API to generate responses based on the provided input.

## Key Features

- **Image Upload:** Users can upload an image as part of their search query.
- **Text Query:** Users can enter a text query to supplement their image search.
- **Google Generative AI API Integration:** The application submits the image and text query to the Google Generative AI API and generates a response based on the input.
- **Reset Functionality:** Users can easily reset the prompts and response.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Generative AI API](https://aistudio.google.com/app/apikey)

## Installation

Follow these steps to get the application up and running:

1. **Clone the repository:**

```bash
git clone https://github.com/your-repo/snap-search.git
```

2. **Install dependencies:**
   Navigate to the project directory and install the dependencies:

```bash
cd snap-search
npm install
```

3. **Set up the Google Generative AI API key:**

   Obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/).
   Create a `.env.local` file in the root directory of the project.
   Add the following line to the file, replacing `<YOUR_API_KEY>` with your actual API key:

```bash
NEXT_PUBLIC_GOOGLE_API_KEY=<YOUR_API_KEY>
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Access the application:**

   Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

- Click the "Add Photo" button or the image preview area to upload an image.
- Enter a text query in the input field.
- Click the "Send" button or press Enter to submit the query.
- Wait for the response to be generated and displayed in the result area.
- To reset the prompts and response, click the "Reset" button.
