import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import heroImage from "./assets/hero.png";

// Preload critical images
const preloadImages = () => {
  const images = [heroImage];
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Add performance optimizations
document.addEventListener("DOMContentLoaded", () => {
  // Preload critical images
  preloadImages();
  
  // Use requestIdleCallback for non-critical operations
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Load non-critical resources or perform non-critical tasks
      console.log('Loading non-critical resources during idle time');
    });
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 