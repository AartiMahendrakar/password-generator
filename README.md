# 🔐 Advanced Password Generator

A modern, secure, and feature-rich password generator built with HTML, CSS, and JavaScript. Generate strong passwords with customizable options, view password strength analysis, and manage your password history with enhanced security features.

![Password Generator Preview](https://img.shields.io/badge/Status-Complete-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎯 Core Functionality
- **Customizable Length**: Password length from 6 to 30 characters
- **Character Type Selection**: Choose from uppercase, lowercase, numbers, and symbols
- **Smart Generation**: Ensures at least one character from each selected type
- **Secure Randomization**: Uses cryptographically secure random generation

### 🛡️ Security Features
- **Password Strength Analysis**: Real-time strength evaluation (Weak/Medium/Strong)
- **Masked History**: Passwords hidden by default in history for privacy
- **Individual Reveal**: Show/hide passwords individually in history
- **No Auto-Generation**: Passwords only created on explicit user action

### 💾 History Management
- **Local Storage**: Saves last 5 generated passwords locally
- **Copy Functionality**: One-click copy for any password
- **Download Feature**: Export password history as .txt file
- **Clear History**: Remove all saved passwords with confirmation

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects
- **Animated Background**: Dynamic floating color orbs
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Polished transitions and hover effects
- **Dark Theme**: Professional space-age aesthetic

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open `index.html`** in any modern web browser
3. **Select character types** you want to include
4. **Adjust password length** using the slider
5. **Click "Generate Password"** to create your password
6. **Copy or save** your password as needed

## 📱 How to Use

### Step 1: Select Character Types
Choose which character types to include in your password:
- ☑️ **Uppercase Letters** (A-Z)
- ☑️ **Lowercase Letters** (a-z)
- ☑️ **Numbers** (0-9)
- ☑️ **Symbols** (!@#$%^&*)

### Step 2: Set Password Length
Use the slider to choose password length (6-30 characters)

### Step 3: Generate Password
Click the "Generate Password" button to create your password

### Step 4: Manage Your Password
- **👁️ Show/Hide**: Toggle password visibility
- **📋 Copy**: Copy password to clipboard
- **View Strength**: See real-time strength analysis

### Step 5: History Management
- **View History**: See your last 5 generated passwords (masked for security)
- **👁️ Reveal**: Click to show individual passwords
- **📋 Copy**: Copy any password from history
- **💾 Download**: Export history as .txt file
- **🗑️ Clear**: Remove all history

## 🔍 Password Strength Criteria

### 🔴 Weak
- Length < 8 characters **OR**
- Only 1 character type selected

### 🟡 Medium
- Length ≥ 8 characters **AND**
- 2+ character types **AND**
- Length < 12 characters

### 🟣 Strong
- Length ≥ 12 characters **AND**
- 3+ character types

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure and modern input elements
- **CSS3**: Grid, Flexbox, animations, backdrop-filter effects
- **Vanilla JavaScript**: ES6+ features, modern Web APIs
- **Web APIs**: localStorage, Clipboard API, Blob API

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### File Structure
```
Password Generator/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🔒 Security Features

### Password Generation
- **Cryptographic Randomness**: Uses secure random number generation
- **Character Shuffling**: Prevents predictable patterns
- **Type Guarantee**: Ensures each selected character type appears

### Privacy Protection
- **Local Storage Only**: No data sent to external servers
- **Masked Display**: Passwords hidden by default in history
- **No Plain Text Storage**: Passwords only visible when explicitly revealed
- **Clear History**: Complete removal of stored passwords

## 🎨 Design Highlights

### Visual Features
- **Multi-layered Background**: Space-themed gradient with floating orbs
- **Glassmorphism Effects**: Frosted glass containers with backdrop blur
- **Smooth Animations**: 60fps transitions and hover effects
- **Responsive Design**: Optimized for all screen sizes

### Color Palette
- **Background**: Deep space gradients (#0f0c29 → #302b63 → #24243e)
- **Accents**: Purple/magenta theme (#ff77e9, #c471ed)
- **Text**: High contrast white on dark background
- **Status Colors**: Red (weak), Yellow (medium), Magenta (strong)

## 📱 Mobile Optimization

- **Touch-Friendly**: Large touch targets for mobile devices
- **Responsive Layout**: Adapts to different screen sizes
- **Optimized Typography**: Readable fonts across all devices
- **Gesture Support**: Smooth scrolling and interactions

## 🚀 Performance

- **Lightweight**: No external dependencies
- **Fast Loading**: Optimized CSS and JavaScript
- **Smooth Animations**: GPU-accelerated transforms
- **Efficient Storage**: Minimal localStorage usage

## 🔧 Customization

### Modify Character Sets
Edit the `characterSets` object in `script.js`:
```javascript
const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};
```

### Adjust History Limit
Change the history limit in `addToPasswordHistory()` function:
```javascript
// Keep only last 5 passwords (change number as needed)
if (passwordHistoryData.length > 5) {
    passwordHistoryData = passwordHistoryData.slice(0, 5);
}
```

### Modify Strength Criteria
Update the strength analysis in `updateStrengthMeter()` function.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons: Emoji characters for cross-platform compatibility
- Design inspiration: Modern glassmorphism and space themes
- Security best practices: OWASP password generation guidelines

---

*Generate strong passwords, stay secure! 🔐* 