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

Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    // Try to find a camera labeled as "back" or "environment"
    const backCamera = devices.find(device =>
      device.label.toLowerCase().includes("back") ||
      device.label.toLowerCase().includes("environment")
    );

    const selectedDeviceId = backCamera ? backCamera.id : devices[0].id;

    html5QrCode.start(
      { deviceId: { exact: selectedDeviceId } },
      { fps: 10, qrbox: { width: 250, height: 250 } },
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
    ).catch(err => {
      console.error("Camera start failed:", err);
    });
  }
}).catch(err => {
  console.error("Failed to get cameras", err);
});
