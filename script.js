// ===== QR Attendance System Script =====

// Elements
const startBtn = document.getElementById("startScan");
const statusMsg = document.getElementById("status");
const video = document.getElementById("video");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// API Gateway URL (later replace with real one)
const API_URL = "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/attendance";

let scanning = false;

// Start camera & scan
startBtn.addEventListener("click", async () => {
  statusMsg.innerText = "Requesting camera access...";
  statusMsg.style.color = "#444";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });

    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    await video.play();

    scanning = true;
    statusMsg


    const apiUrl = "https://2pt3b5f2u7.execute-api.us-east-1.amazonaws.com/attendance";

