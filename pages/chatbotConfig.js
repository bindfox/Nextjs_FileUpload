const config = {
  initialMessages: [
    {
      text: "Hi! I'm a chatbot. How can I help you today?",
      sender: "bot",
    },
  ],
  botName: "My Chatbot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#0084ff",
    },
    chatButton: {
      backgroundColor: "#0084ff",
    },
  },
  widgets: [
    {
      widgetName: "time",
      widgetFunc: () => <div>{new Date().toLocaleTimeString()}</div>,
      mapStateToProps: [],
    },
  ],
};

export default config;
