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

function startCamera(constraints) {
  html5QrCode.start(
    constraints,
    { fps: 10, qrbox: { width: 250, height: 250 } },
    (decodedText) => {
      console.log(`Scanned: ${decodedText}`);
      if (decodedText === "organic" || decodedText === "non-organic") {
        updateScore(decodedText);
      } else {
        alert("Invalid QR code.");
      }
    },
    (errorMessage) => {
      console.warn(errorMessage);
    }
  ).catch(err => {
    console.error("Failed to start camera:", err);
  });
}

// Try forcing environment-facing camera first
navigator.mediaDevices.getUserMedia({
  video: { facingMode: { exact: "environment" } }
}).then(stream => {
  // Stop immediately — just testing if it's available
  stream.getTracks().forEach(track => track.stop());
  startCamera({ facingMode: { exact: "environment" } });
}).catch(err => {
  console.warn("Environment camera not available, falling back to auto-detection");

  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      const backCamera = devices.find(device =>
        device.label.toLowerCase().includes("back") ||
        device.label.toLowerCase().includes("environment")
      );
      const deviceId = backCamera ? backCamera.id : devices[0].id;
      startCamera({ deviceId: { exact: deviceId } });
    } else {
      alert("No cameras found.");
    }
  }).catch(e => {
    console.error("Camera error:", e);
  });
});
