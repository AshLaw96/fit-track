/* eslint-env browser */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CRISP_ID = "0d0e7335-5c5d-407f-b34e-4ab40a619e10";

const ChatWidget = () => {
  const location = useLocation();

  useEffect(() => {
    // Only run if window and document are available (browser environment)
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const isContactPage = location.pathname === "/help/contact";

    if (isContactPage) {
      if (!window.$crisp) {
        window.$crisp = [];
      }
      window.CRISP_WEBSITE_ID = CRISP_ID;

      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      script.id = "crisp-script";
      document.body.appendChild(script);
    }

    return () => {
      if (typeof window === "undefined" || typeof document === "undefined") return;

      if (!location.pathname.includes("/help/contact")) {
        const script = document.getElementById("crisp-script");
        if (script) script.remove();

        const crispElements = document.querySelectorAll("iframe, div");
        crispElements.forEach((el) => {
          const hasCrisp =
            el.src?.includes("crisp.chat") || el.id?.includes("crisp");
          if (hasCrisp || el.id?.startsWith("crisp")) {
            el.remove();
          }
        });

        delete window.$crisp;
        delete window.CRISP_WEBSITE_ID;
      }
    };
  }, [location.pathname]);

  return null;
};

export default ChatWidget;
