import { useState } from "react";
import { Chatbot } from "react-chatbot-kit";
import config from "./chatbotConfig";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const ChatbotPopup = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        onClick={() => setShowChatbot(true)}
      >
        Chat with us
      </button>
      {showChatbot && (
        <div className="fixed bottom-20 right-4 z-10">
          <div className="bg-white shadow-lg rounded-lg p-4 w-80">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowChatbot(false)}
            >
              X
            </button>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotPopup;
