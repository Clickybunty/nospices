import React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Annehmen"
      declineButtonText="Ablehnen"
      enableDeclineButton
      cookieName="userConsent" // Der Name des Cookies
      onAccept={() => {
        Cookies.set("userConsent", "accepted", { expires: 365 });
        console.log("Cookies akzeptiert.");
      }}
      onDecline={() => {
        Cookies.set("userConsent", "declined", { expires: 365 });
        console.log("Cookies abgelehnt.");
      }}
      style={{ background: "#2B373B", color: "#ffffff" }}
      buttonStyle={{ background: "#4CAF50", color: "#ffffff", fontSize: "13px" }}
      declineButtonStyle={{ background: "#f44336", color: "#ffffff", fontSize: "13px" }}
    >
      Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.{" "}
      <a href="/datenschutz" style={{ color: "#4e9fff" }}>
        Mehr erfahren
      </a>.
    </CookieConsent>
  );
};

export default CookieBanner;

