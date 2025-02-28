"use client";
import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieConsentBanner () {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "true") {
      setHasConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setHasConsent(true);
  };

  if (hasConsent) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="I accept"
      cookieName="user-consent"
      onAccept={handleAccept}
      style={{
        background: "#bfd085",
        display: "flex",
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: "center"
      }}
      buttonStyle={{
        background: "#313041",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "100px"
      }}
    >
      This website uses cookies!
    </CookieConsent>
  );
};
