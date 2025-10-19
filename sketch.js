// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/jN8A5yARo/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Camera state: "user" = trước, "environment" = sau
let currentCamera = "user";
let switchButton;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);

  // Nút đổi camera
  switchButton = createButton('Đổi camera');
  switchButton.position(10, height + 10);
  switchButton.mousePressed(toggleCamera);

  // Tạo video
  startVideo(currentCamera);
}

function draw() {
  background(0);
  if (flippedVideo) {
    image(flippedVideo, 0, 0);
  }

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Khởi tạo video với camera cụ thể
function startVideo(facingMode) {
  if (video) {
    video.remove(); // Xoá video cũ nếu có
  }

  let constraints = {
    video: {
      facingMode: { exact: facingMode }
    }
  };

  video = createCapture(constraints, () => {
    video.size(320, 240);
    video.hide();
    flippedVideo = ml5.flipImage(video);
    classifyVideo();
  });
}

// Đổi camera
function toggleCamera() {
  currentCamera = currentCamera === "user" ? "environment" : "user";
  startVideo(currentCamera);
}

// Get a prediction for the current video frame
function classifyVideo() {
  if (video) {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  }
}

// Khi nhận được kết quả
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
