let points = localStorage.getItem('points') || 0;
document.getElementById("points").innerText = `Total Points: ${points}`;

let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
  let message = document.getElementById("message");
  let value = 0;

  if (content.toLowerCase().includes("organic")) {
    value = 10;
    message.innerText = "Organic waste scanned! +10 points";
  } else if (content.toLowerCase().includes("non-organic")) {
    value = 5;
    message.innerText = "Non-organic waste scanned! +5 points";
  } else {
    message.innerText = "Invalid QR code";
    return;
  }

  points = parseInt(points) + value;
  localStorage.setItem('points', points);
  document.getElementById("points").innerText = `Total Points: ${points}`;
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[0]);
  } else {
    alert('No cameras found.');
  }
}).catch(function (e) {
  console.error(e);
});

