// Copyright (c) 2019 ml5
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Biến classifier
let classifier;

// URL model
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/jN8A5yARo/';

// Video
let video;
let flippedVideo;

// Lưu kết quả phân loại
let label = "";

// Load model trước
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);

  // Tạo video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  // Lật video để hiển thị đúng chiều
  flippedVideo = ml5.flipImage(video);

  // Bắt đầu phân loại
  classifyVideo();
}

function draw() {
  background(0);

  // Vẽ video
  image(flippedVideo, 0, 0);

  // Vẽ nhãn kết quả
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Phân loại frame hiện tại
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// Khi nhận được kết quả
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Lấy nhãn kết quả đầu tiên
  label = results[0].label;

  // Phân loại tiếp
  classifyVideo();
}

