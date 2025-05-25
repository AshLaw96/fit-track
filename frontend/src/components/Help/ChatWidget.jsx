import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ChatWidget = () => {
  const location = useLocation();

  useEffect(() => {
    const isContactPage = location.pathname === "/help/contact";

    // Only load Tidio on contact page, and only if not already loaded
    if (isContactPage && !window.tidioInitialized) {
      const script = document.createElement("script");
      script.src = "//code.tidio.co/pffzkdrq7kfaq7g9bnsml6xmbiyy5s0f.js";
      script.async = true;
      script.onload = () => {
        window.tidioInitialized = true;
      };
      document.body.appendChild(script);
    }

  }, [location]);

  return null;
};

export default ChatWidget;
