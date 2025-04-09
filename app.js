let score = parseInt(localStorage.getItem("userScore")) || 0;
document.getElementById("score").innerText = `Your Score: ${score}`;

function updateScore(type) {
  if (type === "organic") {
    score += 10;
  } else if (type === "non-organic") {
    score += 5;
  }
  localStorage.setItem("userScore", score);
  document.getElementById("score").innerText = `Your Score: ${score}`;
}

const html5QrCode = new Html5Qrcode("reader");
let currentFacingMode = "environment"; // Start with rear camera
let isScannerRunning = false;

// Function to start the scanner with a given camera
function startScanner(facingMode) {
  if (isScannerRunning) {
    html5QrCode.stop().then(() => {
      isScannerRunning = false;
      startScanner(facingMode);
    });
    return;
  }

  html5QrCode.start(
    { facingMode: { exact: facingMode } },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    },
    (decodedText) => {
      console.log(`Scanned: ${decodedText}`);
      if (decodedText === "organic" || decodedText === "non-organic") {
        updateScore(decodedText);
      } else {
        alert("Invalid QR code content.");
      }
    },
    (errorMessage) => {
      console.warn(errorMessage);
    }
  ).then(() => {
    isScannerRunning = true;
  }).catch((err) => {
    console.error("Camera start failed", err);
    alert("Failed to access camera.");
  });
}

// Initial start with rear camera
startScanner(currentFacingMode);

// Switch camera when button is clicked
document.getElementById("switchCamera").addEventListener("click", () => {
  currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
  startScanner(currentFacingMode);
});
