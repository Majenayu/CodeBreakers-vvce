const clothingItems = {
    shirt1: 'file:///C:/Users/pgayu/OneDrive/Desktop/make4mysore/s01-removebg-preview.png',
    shirt2: 'file:///C:/Users/pgayu/OneDrive/Desktop/make4mysore/shirtt-removebg-preview.png',
    pants1: 'file:///C:/Users/pgayu/OneDrive/Desktop/make4mysore/i1-removebg-preview.png',
    pants2: 'file:///C:/Users/pgayu/OneDrive/Desktop/make4mysore/i2-removebg-preview.png',
    pants3: 'file:///C:/Users/pgayu/OneDrive/Desktop/make4mysore/i3-removebg-preview.png',
};

let currentClothingItem = '';
let currentClothingType = '';
let pose;
let canvasElement = document.getElementById('outputCanvas');
let canvasCtx = canvasElement.getContext('2d');
let webcamElement = document.getElementById('webcam');

// Function to set up the webcam
function setupWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            webcamElement.srcObject = stream;
            webcamElement.play();
            setupPoseDetection();
        })
        .catch(error => {
            console.error('Error accessing webcam:', error);
        });
}

// Function to show clothing options
function showOptions(type) {
    const optionsDiv = document.getElementById('options');
    const optionsTitle = document.getElementById('optionsTitle');
    const clothingOptionsDiv = document.getElementById('clothingOptions');
    const tryButton = document.getElementById('tryButton');
    const resetButton = document.getElementById('resetButton');

    optionsDiv.style.display = 'block';
    optionsTitle.textContent = `Select a ${type}`;
    clothingOptionsDiv.innerHTML = '';

    Object.keys(clothingItems).forEach(key => {
        if (key.startsWith(type)) {
            const clothingOption = document.createElement('div');
            clothingOption.className = 'clothing-option';
            const clothingImage = document.createElement('img');
            clothingImage.src = clothingItems[key];
            clothingImage.alt = key;
            clothingImage.onclick = () => {
                currentClothingItem = key;
                currentClothingType = type;
                tryButton.style.display = 'block';
                resetButton.style.display = 'block';
                Array.from(clothingOptionsDiv.children).forEach(option => {
                    option.classList.remove('selected');
                });
                clothingOption.classList.add('selected');
            };
            clothingOption.appendChild(clothingImage);
            clothingOptionsDiv.appendChild(clothingOption);
        }
    });
}

// Set up MediaPipe Pose detection
async function setupPoseDetection() {
    pose = new Pose({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}` });
    pose.setOptions({
        modelComplexity: 1,
        enableSegmentation: false,
        smoothLandmarks: true
    });
    pose.onResults(onResults);

    processVideoFrame(); // Start processing frames manually
}

// Function to process each frame from the webcam
function processVideoFrame() {
    if (!webcamElement.videoWidth) {
        requestAnimationFrame(processVideoFrame);
        return;
    }
    canvasCtx.drawImage(webcamElement, 0, 0, canvasElement.width, canvasElement.height);
    pose.send({ image: webcamElement }).then(() => {
        requestAnimationFrame(processVideoFrame); // Process the next frame
    });
}

// Function to handle pose detection results
function onResults(results) {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks && currentClothingItem) {
        const leftShoulder = results.poseLandmarks[11];
        const rightShoulder = results.poseLandmarks[12];
        const leftHip = results.poseLandmarks[23];
        const rightHip = results.poseLandmarks[24];

        if (currentClothingType === 'shirt') {
            // Calculate shirt overlay position based on shoulders
            const shirtWidth = Math.abs(rightShoulder.x - leftShoulder.x) * canvasElement.width * 2 * 0.9; // Scale down
            const shirtHeight = shirtWidth * 1.2; // Adjust for aspect ratio
            const shirtX = (leftShoulder.x + rightShoulder.x) / 2 * canvasElement.width - shirtWidth / 2;
            const shirtY = (leftShoulder.y + rightShoulder.y) / 2 * canvasElement.height - shirtHeight / 7; // Offset for better alignment

            const shirtImage = new Image();
            shirtImage.src = clothingItems[currentClothingItem];
            shirtImage.onload = () => {
                canvasCtx.drawImage(shirtImage, shirtX, shirtY, shirtWidth, shirtHeight);
            };
        }

        if (currentClothingType === 'pants') {
            // Calculate pants overlay position based on hips
            const pantsWidth = Math.abs(rightHip.x - leftHip.x) * canvasElement.width * 1* 3.9; // Scale down
            const pantsHeight = pantsWidth * 1.7; // Adjust for aspect ratio
            const pantsX = (leftHip.x + rightHip.x) / 2* canvasElement.width - pantsWidth /2;
            const pantsY = (leftHip.y + rightHip.y) / 2 * canvasElement.height-30; // Offset for better alignment

            const pantsImage = new Image();
            pantsImage.src = clothingItems[currentClothingItem];
            pantsImage.onload = () => {
                canvasCtx.drawImage(pantsImage, pantsX, pantsY, pantsWidth, pantsHeight);
            };
        }
    }
}

// Function to try on the selected clothing item
function tryOn() {
    if (currentClothingItem) {
        setupPoseDetection();
    }
}

// Function to reset the clothing selection
function resetSelection() {
    currentClothingItem = '';
    currentClothingType = '';
    document.getElementById('tryButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear the canvas
}