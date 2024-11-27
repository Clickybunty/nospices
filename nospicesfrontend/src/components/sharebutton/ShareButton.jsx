import React, { useState } from "react";
import styles from "./ShareButton.module.css";

export default function ShareButton() {
  const [showPopup, setShowPopup] = useState(false);

  const currentURL = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link wurde kopiert!");
    setShowPopup(false);
  };

  const handleShareWhatsApp = () => {
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(currentURL)}`;
    window.open(whatsappURL, "_blank");
    setShowPopup(false);
  };

  const handleShareDiscord = () => {
    const discordURL = `https://discord.com/channels/@me?message=${encodeURIComponent(
      currentURL
    )}`;
    window.open(discordURL, "_blank");
    setShowPopup(false);
  };

  return (
    <div className={styles.shareButton}>
      <button onClick={() => setShowPopup(!showPopup)}>Teilen</button>
      {showPopup && (
        <div className={styles.popup}>
          <p>Teilen über:</p>
          <button onClick={handleCopyLink}>Link kopieren</button>
          <button onClick={handleShareWhatsApp}>WhatsApp</button>
          <button onClick={handleShareDiscord}>Discord</button>
        </div>
      )}
    </div>
  );
}
