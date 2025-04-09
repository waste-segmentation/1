// Get current score or set to 0
let score = parseInt(localStorage.getItem("userScore")) || 0;
document.getElementById("score").innerText = `Your Score: ${score}`;

// Function to update score
function updateScore(type) {
  if (type === "organic") {
    score += 10;
  } else if (type === "non-organic") {
    score += 5;
  }
  localStorage.setItem("userScore", score);
  document.getElementById("score").innerText = `Your Score: ${score}`;
}

// Start QR code scanner using rear camera
const html5QrCode = new Html5Qrcode("reader");

html5QrCode.start(
  { facingMode: { exact: "environment" } }, // rear camera
  {
    fps: 10,
    qrbox: { width: 250, height: 250 }
  },
  (decodedText, decodedResult) => {
    console.log(`Scanned: ${decodedText}`);
    if (decodedText === "organic" || decodedText === "non-organic") {
      updateScore(decodedText);
    } else {
      alert("Invalid QR code content.");
    }
  },
  (errorMessage) => {
    // optional: handle scan errors
    console.warn(errorMessage);
  }
).catch((err) => {
  console.error("Camera start failed", err);
});
