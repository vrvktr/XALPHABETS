import React, { useCallback, useEffect, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function App() {
  const [text, setText] = useState("");

  const handleKeyPress = useCallback((key) => {
    if (/^[a-z]$/i.test(key)) {
      setText((currentText) => currentText + key.toUpperCase());
      return;
    }

    if (key === "Backspace") {
      setText((currentText) => currentText.slice(0, -1));
    }
  }, []);

  useEffect(() => {
    const handlePhysicalKeyDown = (event) => {
      // Ignore shortcuts and modified keystrokes.
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (/^[a-z]$/i.test(event.key)) {
        setText((currentText) => currentText + event.key.toUpperCase());
      } else if (event.key === "Backspace") {
        // Prevent browser navigation when Backspace is pressed.
        event.preventDefault();
        setText((currentText) => currentText.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handlePhysicalKeyDown);
    return () => window.removeEventListener("keydown", handlePhysicalKeyDown);
  }, []);

  return (
    <main className="container-fluid app-shell d-flex align-items-center justify-content-center">
      <section className="alphabet-card card border-0">
        <div className="card-body">
          <header className="text-center">
            <h1 className="app-title">Alphabet Buttons</h1>
            <p className="app-subtitle">
              Click letters (or use your keyboard) to build text.
            </p>
          </header>

          <div className="output" aria-live="polite" aria-label="Your text">
            {text || (
              <span className="output-placeholder">
                Your text will appear here...
              </span>
            )}
          </div>

          <div className="backspace-row d-flex justify-content-end">
            <button
              type="button"
              className="btn backspace-button"
              onClick={() => handleKeyPress("Backspace")}
            >
              Backspace
            </button>
          </div>

          <div className="alphabet-grid" aria-label="Alphabet keys">
            {ALPHABET.map((letter) => (
              <button
                type="button"
                className="key btn"
                key={letter}
                onClick={() => handleKeyPress(letter)}
                aria-label={letter}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}