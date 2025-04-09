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

Html5Qrcode.getCameras()
  .then((devices) => {
    if (devices && devices.length) {
      // Try to find the rear camera
      const backCam = devices.find((device) =>
        device.label.toLowerCase().includes("back") ||
        device.label.toLowerCase().includes("environment")
      );

      const cameraId = backCam ? backCam.id : devices[0].id;

      html5QrCode
        .start(
          { deviceId: { exact: cameraId } },
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
            console.warn(`QR Scan error: ${errorMessage}`);
          }
        )
        .catch((err) => {
          console.error("Camera start error:", err);
          alert("Failed to start the camera. Please allow camera access.");
        });
    } else {
      alert("No cameras found on this device.");
    }
  })
  .catch((err) => {
    console.error("Camera access error:", err);
    alert("Unable to access the camera.");
  });
