import { useState } from "react";
import axios from "axios";

const useChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu CFO Virtual. Puedo ayudarte a analizar tus finanzas. ¿Qué te gustaría saber?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        mensaje: userMessage,
      });

      setMessages([
        ...newMessages,
        { role: "assistant", content: response.data.respuesta },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Lo siento, hubo un error. Intenta de nuevo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChat;
