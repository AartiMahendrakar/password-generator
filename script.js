// Character sets for password generation
const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// DOM elements
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const passwordOutput = document.getElementById('passwordOutput');
const togglePasswordBtn = document.getElementById('togglePassword');
const copyPasswordBtn = document.getElementById('copyPassword');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthText = document.getElementById('strengthText');
const copyNotification = document.getElementById('copyNotification');
const passwordHistory = document.getElementById('passwordHistory');
const clearHistoryBtn = document.getElementById('clearHistory');
const downloadHistoryBtn = document.getElementById('downloadHistory');

// Password history management
let passwordHistoryData = JSON.parse(localStorage.getItem('passwordHistory')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Update length value display when slider changes
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
        if (passwordOutput.value) {
            updateStrengthMeter(passwordOutput.value);
        }
    });

    // Generate password on button click
    generateBtn.addEventListener('click', generatePassword);

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

    // Copy password to clipboard
    copyPasswordBtn.addEventListener('click', copyToClipboard);

    // History management
    clearHistoryBtn.addEventListener('click', clearPasswordHistory);
    downloadHistoryBtn.addEventListener('click', downloadPasswordHistory);

    // Load and display existing history
    displayPasswordHistory();

    // Don't generate initial password - let user select options first
    // Show initial guidance
    showInitialGuidance();
});

// Generate password function
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    // Validate that at least one character type is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        // Add visual feedback for validation error
        showValidationError('Please select at least one character type!');
        return;
    }

    // Build character pool and required characters based on user selection
    let characterPool = '';
    const requiredChars = [];

    // Only include selected character types
    if (includeUppercase) {
        characterPool += characterSets.uppercase;
        requiredChars.push(getRandomChar(characterSets.uppercase));
    }
    if (includeLowercase) {
        characterPool += characterSets.lowercase;
        requiredChars.push(getRandomChar(characterSets.lowercase));
    }
    if (includeNumbers) {
        characterPool += characterSets.numbers;
        requiredChars.push(getRandomChar(characterSets.numbers));
    }
    if (includeSymbols) {
        characterPool += characterSets.symbols;
        requiredChars.push(getRandomChar(characterSets.symbols));
    }

    // Generate password
    let password = '';
    
    // If password length is less than or equal to required characters, just use required chars
    if (length <= requiredChars.length) {
        // Shuffle required chars and take only the needed length
        const shuffledRequired = shuffleArray([...requiredChars]);
        password = shuffledRequired.slice(0, length).join('');
    } else {
        // First, add required characters to ensure at least one of each selected type
        password = requiredChars.join('');

        // Fill the rest of the password length with random characters from the pool
        for (let i = requiredChars.length; i < length; i++) {
            password += getRandomChar(characterPool);
        }

        // Shuffle the entire password to avoid predictable patterns
        password = shuffleString(password);
    }

    // Display the password
    passwordOutput.value = password;

    // Update strength meter
    const strength = updateStrengthMeter(password);

    // Add to history
    addToPasswordHistory(password, strength);

    // Add generation animation
    passwordOutput.style.transform = 'scale(1.02)';
    setTimeout(() => {
        passwordOutput.style.transform = 'scale(1)';
    }, 200);

    // Clear any validation errors
    clearValidationError();
}

// Get random character from a string
function getRandomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
}

// Shuffle string characters
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

// Shuffle array elements
function shuffleArray(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

// Update password strength meter with enhanced criteria
function updateStrengthMeter(password) {
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);

    // Count character types
    let charTypes = 0;
    if (hasUppercase) charTypes++;
    if (hasLowercase) charTypes++;
    if (hasNumbers) charTypes++;
    if (hasSymbols) charTypes++;

    let strengthLevel = '';
    let strengthClass = '';

    // Enhanced strength analysis based on requirements
    if (length < 8 || charTypes === 1) {
        strengthLevel = 'Weak';
        strengthClass = 'weak';
    } else if (length >= 8 && charTypes >= 2 && length < 12) {
        strengthLevel = 'Medium';
        strengthClass = 'medium';
    } else if (length >= 12 && charTypes >= 3) {
        strengthLevel = 'Strong';
        strengthClass = 'strong';
    } else {
        // Edge cases
        strengthLevel = 'Medium';
        strengthClass = 'medium';
    }

    // Update UI
    strengthIndicator.className = `strength-fill ${strengthClass}`;
    strengthText.textContent = `Password Strength: ${strengthLevel}`;

    // Add color to strength text
    strengthText.style.color = strengthClass === 'weak' ? '#ff6b6b' : 
                              strengthClass === 'medium' ? '#feca57' : '#ff77e9';

    return strengthClass;
}

// Toggle password visibility
function togglePasswordVisibility() {
    const isPassword = passwordOutput.type === 'password';
    passwordOutput.type = isPassword ? 'text' : 'password';
    togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
    togglePasswordBtn.title = isPassword ? 'Hide Password' : 'Show Password';
}

// Copy password to clipboard
async function copyToClipboard() {
    if (!passwordOutput.value) {
        alert('No password to copy! Please generate a password first.');
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordOutput.value);
        showCopyNotification();
    } catch (err) {
        // Fallback for older browsers
        passwordOutput.select();
        document.execCommand('copy');
        showCopyNotification();
    }
}

// Show copy notification
function showCopyNotification() {
    copyNotification.classList.add('show');
    setTimeout(() => {
        copyNotification.classList.remove('show');
    }, 2000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Generate password with Enter key
    if (e.key === 'Enter' && e.target !== passwordOutput) {
        generatePassword();
    }
    
    // Copy password with Ctrl+C when password field is focused
    if (e.ctrlKey && e.key === 'c' && document.activeElement === passwordOutput) {
        copyToClipboard();
    }
    
    // Generate new password with Space when generate button is focused
    if (e.key === ' ' && document.activeElement === generateBtn) {
        e.preventDefault();
        generatePassword();
    }
});

// Add smooth transitions for checkbox changes
[uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Clear validation error when user makes a selection
        clearValidationError();
        
        // Update guidance based on selection - but don't auto-generate password
        if (hasAnyCharacterTypeSelected()) {
            // Update strength meter to encourage generation
            strengthText.textContent = 'Click Generate Password to create your password';
            strengthText.style.color = '#667eea';
        } else {
            // No selections, show initial guidance
            showInitialGuidance();
            // Clear the password field if no character types are selected
            passwordOutput.value = '';
        }
    });
});

// Add hover effects for interactive elements
generateBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
});

generateBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// Password history functions
function addToPasswordHistory(password, strength) {
    const timestamp = new Date().toLocaleString();
    const historyItem = {
        password: password,
        strength: strength,
        timestamp: timestamp,
        id: Date.now()
    };

    // Add to beginning of array
    passwordHistoryData.unshift(historyItem);

    // Keep only last 5 passwords
    if (passwordHistoryData.length > 5) {
        passwordHistoryData = passwordHistoryData.slice(0, 5);
    }

    // Save to localStorage
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistoryData));

    // Update display
    displayPasswordHistory();
}

function displayPasswordHistory() {
    if (passwordHistoryData.length === 0) {
        passwordHistory.innerHTML = '<p class="no-history">No passwords generated yet</p>';
        return;
    }

    const historyHTML = passwordHistoryData.map((item, index) => {
        const maskedPassword = '•'.repeat(item.password.length);
        return `
            <div class="history-item">
                <div class="history-password-container">
                    <div class="history-password" id="historyPassword-${index}" data-masked="true" data-original="${item.password}">${maskedPassword}</div>
                    <button class="history-reveal-btn" onclick="togglePasswordVisibility(${index})" title="Show/Hide Password">👁️</button>
                </div>
                <div class="history-strength ${item.strength}">${item.strength.toUpperCase()}</div>
                <button class="history-copy-btn" onclick="copyHistoryPassword('${item.password}')" title="Copy Password">📋</button>
            </div>
        `;
    }).join('');

    passwordHistory.innerHTML = historyHTML;
}

function copyHistoryPassword(password) {
    navigator.clipboard.writeText(password).then(() => {
        showCopyNotification();
    }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = password;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showCopyNotification();
    });
}

function clearPasswordHistory() {
    if (passwordHistoryData.length === 0) {
        alert('No password history to clear!');
        return;
    }

    if (confirm('Are you sure you want to clear all password history?')) {
        passwordHistoryData = [];
        localStorage.removeItem('passwordHistory');
        displayPasswordHistory();
        
        // Show notification
        const originalText = copyNotification.textContent;
        copyNotification.textContent = 'Password history cleared!';
        copyNotification.classList.add('show');
        setTimeout(() => {
            copyNotification.classList.remove('show');
            setTimeout(() => {
                copyNotification.textContent = originalText;
            }, 300);
        }, 2000);
    }
}

function downloadPasswordHistory() {
    if (passwordHistoryData.length === 0) {
        alert('No passwords to download! Generate some passwords first.');
        return;
    }

    const content = passwordHistoryData.map((item, index) => 
        `Password ${index + 1}: ${item.password} (Strength: ${item.strength.toUpperCase()}) - Generated: ${item.timestamp}`
    ).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `password-history-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Show notification
    const originalText = copyNotification.textContent;
    copyNotification.textContent = 'Password history downloaded!';
    copyNotification.classList.add('show');
    setTimeout(() => {
        copyNotification.classList.remove('show');
        setTimeout(() => {
            copyNotification.textContent = originalText;
        }, 300);
    }, 2000);
}

// Validation error handling
function showValidationError(message) {
    // Remove any existing error
    clearValidationError();
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.id = 'validationError';
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    
    // Insert after the checkbox group
    const checkboxGroup = document.querySelector('.checkbox-group');
    checkboxGroup.parentNode.insertBefore(errorDiv, checkboxGroup.nextSibling);
    
    // Add shake animation to checkboxes
    checkboxGroup.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        checkboxGroup.style.animation = '';
    }, 500);
}

function clearValidationError() {
    const existingError = document.getElementById('validationError');
    if (existingError) {
        existingError.remove();
    }
}

// Show initial guidance to users
function showInitialGuidance() {
    // Update strength meter to show initial state
    strengthIndicator.className = 'strength-fill';
    strengthText.textContent = 'Select character types to generate password';
    strengthText.style.color = '#999';
}

// Check if any character type is selected
function hasAnyCharacterTypeSelected() {
    return uppercaseCheckbox.checked || lowercaseCheckbox.checked || 
           numbersCheckbox.checked || symbolsCheckbox.checked;
}

// Toggle password visibility in history
function togglePasswordVisibility(index) {
    const passwordElement = document.getElementById(`historyPassword-${index}`);
    const isMasked = passwordElement.getAttribute('data-masked') === 'true';
    const originalPassword = passwordElement.getAttribute('data-original');
    const revealBtn = passwordElement.nextElementSibling;
    
    if (isMasked) {
        // Show password
        passwordElement.textContent = originalPassword;
        passwordElement.setAttribute('data-masked', 'false');
        revealBtn.textContent = '🙈';
        revealBtn.title = 'Hide Password';
    } else {
        // Hide password
        const maskedPassword = '•'.repeat(originalPassword.length);
        passwordElement.textContent = maskedPassword;
        passwordElement.setAttribute('data-masked', 'true');
        revealBtn.textContent = '👁️';
        revealBtn.title = 'Show Password';
    }
}

// Prevent form submission if wrapped in a form
document.addEventListener('submit', function(e) {
    e.preventDefault();
    generatePassword();
}); 