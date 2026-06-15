# 👔 Digital Mirror - Virtual Try-On System

<div align="center">

![Project Banner](https://img.shields.io/badge/Virtual-Try--On-orange?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-46.5%25-yellow?style=flat-square)
![CSS](https://img.shields.io/badge/CSS-28.4%25-blue?style=flat-square)
![HTML](https://img.shields.io/badge/HTML-25.1%25-red?style=flat-square)

**An AI-powered virtual dressing room experience using real-time pose detection**

[Live Demo](https://codebreakers-vvce.onrender.com/) • [Report Bug](https://github.com/Majenayu/CodeBreakers-vvce/issues) • [Request Feature](https://github.com/Majenayu/CodeBreakers-vvce/issues)

</div>

---

## 📋 Project Information

**Project Name:** Digital Mirror - Virtual Try-On System  
**Developer:** P G AYUSH RAI (majen)  
**Institution:** Vidyavardhaka College of Engineering (VVCE)  
**Build Date:** 2024  
**Project Type:** Web-based Virtual Try-On Application  

---

## 🎯 About The Project

Digital Mirror is an innovative web-based virtual try-on system that allows users to visualize clothing items (shirts and pants) on themselves in real-time using their webcam. The application leverages MediaPipe Pose Detection to track body landmarks and overlay clothing images accurately on the user's body, creating an immersive virtual dressing experience.

### Key Features

✨ **Real-time Pose Detection** - Uses MediaPipe AI to detect and track body landmarks  
👕 **Virtual Clothing Overlay** - Dynamically overlays shirts and pants on detected body positions  
📱 **Webcam Integration** - Supports both built-in and external webcams (including DroidCam)  
🎨 **Interactive Selection** - Choose from multiple clothing options with visual preview  
⚡ **Instant Visualization** - See how clothes fit in real-time with smooth rendering  
🔄 **Reset Functionality** - Easily switch between different clothing items  

---

## 🛠️ Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Core application logic
- **MediaPipe Pose** - AI-powered pose detection and body landmark tracking
- **Canvas API** - Real-time image rendering and overlay
- **WebRTC** - Webcam access and video streaming

---

## 📂 Project Structure

```
CodeBreakers-vvce/
│
├── index.html              # Landing page with project introduction
├── index1.html             # Main try-on interface
├── script1.js              # Core JavaScript logic for pose detection & overlay
├── styles.css              # Landing page styles
├── styles1.css             # Try-on interface styles
│
├── background.jpg          # Background image for landing page
├── vvcelogo.jpg           # College logo
│
├── s01-removebg-preview.png      # Shirt option 1
├── shirtt-removebg-preview.png   # Shirt option 2
├── i1-removebg-preview.png       # Pants option 1
├── i2-removebg-preview.png       # Pants option 2
├── i3-removebg-preview.png       # Pants option 3
│
├── DroidCam.Setup.6.5.2.exe     # DroidCam installer for mobile webcam
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Webcam (built-in or external)
- Internet connection (for MediaPipe CDN)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Majenayu/CodeBreakers-vvce.git
   cd CodeBreakers-vvce
   ```

2. **Launch the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

3. **Optional: Set up DroidCam (for mobile webcam)**
   - Install DroidCam on your Android phone (from Play Store)
   - Run `DroidCam.Setup.6.5.2.exe` on your PC
   - Connect your phone and PC on the same network
   - Launch DroidCam on both devices

---

## 📱 How to Use

### Step-by-Step Guide

1. **Start the Application**
   - Open `index.html` in your browser
   - Click "Start the Process" button

2. **Grant Webcam Access**
   - When prompted, allow webcam access
   - Your live video feed will appear on screen

3. **Choose Clothing Type**
   - Click "Shirt" to browse shirt options
   - Click "Pants" to browse pants options

4. **Select Your Style**
   - Click on any clothing item to preview
   - Selected item will be highlighted

5. **Try It On**
   - Click the "Try" button
   - Stand in front of the camera
   - The clothing will overlay on your body in real-time

6. **Switch Items**
   - Click "Reset" to clear the current selection
   - Choose a different clothing item and try again

---

## 💡 How It Works

### Technical Implementation

1. **Pose Detection Pipeline**
   ```
   Webcam Feed → MediaPipe Pose → Landmark Detection → Canvas Rendering
   ```

2. **Body Landmark Tracking**
   - Detects 33 body landmarks using MediaPipe
   - Tracks shoulders (landmarks 11, 12) for shirt positioning
   - Tracks hips (landmarks 23, 24) for pants positioning

3. **Dynamic Overlay Calculation**
   - Calculates clothing dimensions based on body proportions
   - Adjusts scale and position in real-time
   - Maintains aspect ratio for natural appearance

4. **Rendering Process**
   - Captures video frame from webcam
   - Processes frame through pose detection
   - Overlays clothing image on canvas
   - Repeats at video framerate for smooth experience

---

## 🎨 Customization

### Adding New Clothing Items

1. Prepare your clothing image (PNG with transparent background)
2. Add image file to project directory
3. Update `clothingItems` object in `script1.js`:
   ```javascript
   const clothingItems = {
       shirt3: 'path/to/your/new-shirt.png',
       pants4: 'path/to/your/new-pants.png',
   };
   ```

### Adjusting Overlay Position

Modify scaling factors in `script1.js`:
```javascript
// For shirts
const shirtWidth = Math.abs(rightShoulder.x - leftShoulder.x) * canvasElement.width * 2 * 0.9;

// For pants
const pantsWidth = Math.abs(rightHip.x - leftHip.x) * canvasElement.width * 1 * 3.9;
```

---

## 🔧 Configuration

### DroidCam Setup (Optional)

If using your smartphone as a webcam:

1. Download DroidCam from Google Play Store
2. Install `DroidCam.Setup.6.5.2.exe` on your PC
3. Connect both devices to the same Wi-Fi network
4. Launch DroidCam on phone and note the IP address
5. Enter the IP in DroidCam Client on PC
6. Click "Start" to use your phone as webcam

---

## 🌐 Live Demo

Experience the virtual try-on system live:  
**[https://codebreakers-vvce.onrender.com/](https://codebreakers-vvce.onrender.com/)**

---

## 🐛 Known Issues & Limitations

- Requires good lighting for accurate pose detection
- Best results with solid background
- Clothing overlay may need adjustment based on camera angle
- Local file paths in `script1.js` need updating for production use

---

## 🚧 Future Enhancements

- [ ] Add more clothing categories (jackets, accessories)
- [ ] Implement color customization
- [ ] Add size recommendations based on body measurements
- [ ] Support for multiple users simultaneously
- [ ] Save and share try-on screenshots
- [ ] Mobile-responsive design
- [ ] 3D clothing models for better realism

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is part of an academic initiative at Vidyavardhaka College of Engineering.  
For licensing inquiries, please contact the developer.

---

## 👤 Developer

**P G AYUSH RAI (majen)**

- GitHub: [@Majenayu](https://github.com/Majenayu)
- Institution: Vidyavardhaka College of Engineering (VVCE)

---

## 🙏 Acknowledgments

- **MediaPipe** - For the pose detection library
- **Vidyavardhaka College of Engineering** - For project support
- **DroidCam** - For mobile webcam solution
- **CodeBreakers Team** - For collaboration and testing

---

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/Majenayu/CodeBreakers-vvce/issues)
- Contact: P G AYUSH RAI (majen)

---

<div align="center">

**Made with ❤️ by P G AYUSH RAI (majen)**

⭐ Star this repository if you find it helpful!

</div>
