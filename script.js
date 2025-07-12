let currentTab = "link";
let qr;

function switchTab(tab) {
  currentTab = tab;
  document.getElementById("linkTab").classList.toggle("hidden", tab !== "link");
  document.getElementById("wifiTab").classList.toggle("hidden", tab !== "wifi");

  document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.tabs button[onclick="switchTab('${tab}')"]`).classList.add("active");

  generateQR();
}

function generateQR() {
  const container = document.getElementById("qrcode");
  container.innerHTML = "";

  let qrData = "";
  if (currentTab === "link") {
    const url = document.getElementById("linkInput").value.trim();
    if (!url) return;
    qrData = url;
  } else {
    const ssid = document.getElementById("ssid").value;
    const pass = document.getElementById("password").value;
    const enc = document.getElementById("encryption").value;
    qrData = `WIFI:T:${enc};S:${ssid};P:${pass};H:false;;`;
  }

  qr = new QRCode(container, {
    text: qrData,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

function downloadQR() {
  if (!qr) return;
  const img = document.querySelector("#qrcode img");
  if (!img) return;
  const link = document.createElement("a");
  link.href = img.src;
  link.download = "qr-code.png";
  link.click();
}
