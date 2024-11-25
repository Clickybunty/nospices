import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Akzeptieren"
      declineButtonText="Ablehnen"
      enableDeclineButton
      onAccept={() => {
        console.log("Cookies wurden akzeptiert.");
      }}
      onDecline={() => {
        console.log("Cookies wurden abgelehnt.");
      }}
      cookieName="userConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      declineButtonStyle={{ color: "#ffffff", background: "#f44336" }}
    >
      Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.{" "}
      <a href="/datenschutz" style={{ color: "#4e9fff" }}>
        Mehr erfahren
      </a>.
    </CookieConsent>
  );
};

export default CookieBanner;
