import React, { useState } from "react";
import styles from "./ShareButton.module.css";

export default function ShareButton({ darkMode }) {
  const [showModal, setShowModal] = useState(false);

  const currentURL = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link wurde kopiert!");
    setShowModal(false);
  };

  const handleShareWhatsApp = () => {
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(currentURL)}`;
    window.open(whatsappURL, "_blank");
    setShowModal(false);
  };

  const handleShareDiscord = () => {
    const discordURL = `https://discord.com/channels/@me?message=${encodeURIComponent(
      currentURL
    )}`;
    window.open(discordURL, "_blank");
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev); // Toggle für Modal
  };

  return (
    <>
      <button className={styles.shareButton} onClick={toggleModal}>
        Teilen
      </button>
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)} // Schließt das Modal bei Klick außerhalb
        >
          <div
            className={`${styles.modal} ${darkMode ? "dark-mode" : ""}`}
            onClick={(e) => e.stopPropagation()} // Verhindert Schließen bei Klick im Modal
          >
            <h2>Teilen</h2>
            <p>Wählen Sie eine Option, um diese Seite zu teilen:</p>
            <button onClick={handleCopyLink}>Link kopieren</button>
            <button onClick={handleShareWhatsApp}>WhatsApp</button>
            <button onClick={handleShareDiscord}>Discord</button>
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
