import bus from "../utils/bus";
import { useState, useEffect } from "react";

const Message = () => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("bg-green-700");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 5000);
      
    });

  }, []);

  return (
    visibility && (
      <div className={`mb-10 ${type}`}>
        <div className="max-w-screen-xl mx-auto px-4 py-3 text-white sm:text-center md:px-8">
          <p className="font-medium">{message}</p>
        </div>
      </div>
    )
  );
};

export default Message;
