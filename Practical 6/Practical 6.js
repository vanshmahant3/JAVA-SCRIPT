// Load a sample student profile text into the textarea
function loadSample() {
    const sampleText = `Student Name: Vansh Mahant
Roll Number: 24070521038
Email Address: vanshmahant3@gmail.com
Phone Number: 8446936170
Department: Computer Science`;

    document.getElementById('rawInput').value = sampleText;
}

// Main logic to process text, run regex, and validate details
function processText() {
    const rawText = document.getElementById('rawInput').value.trim();

    if (!rawText) {
        alert("Please enter some text or load the sample text first!");
        return;
    }

    // 1. Extract Details using Regular Expressions
    const nameMatch = rawText.match(/(?:Student\s+)?Name:\s*([^\n\r,]+)/i);
    const rollMatch = rawText.match(/(?:Roll\s*(?:Number|No)?):\s*([^\n\r,]+)/i);
    const emailMatch = rawText.match(/(?:Email(?:\s*Address)?):\s*([^\n\r\s,]+)/i) || rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = rawText.match(/(?:Phone(?:\s*Number)?|Contact):\s*([^\n\r\s,]+)/i) || rawText.match(/\b\d{10}\b/) || rawText.match(/\b\d+\b/);
    const deptMatch = rawText.match(/(?:Department|Dept):\s*([^\n\r,]+)/i);

    const name = nameMatch ? nameMatch[1].trim() : "Not Found";
    const roll = rollMatch ? rollMatch[1].trim() : "Not Found";
    const email = emailMatch ? (emailMatch[1] ? emailMatch[1].trim() : emailMatch[0].trim()) : "Not Found";
    const phone = phoneMatch ? (phoneMatch[1] ? phoneMatch[1].trim() : phoneMatch[0].trim()) : "Not Found";
    const department = deptMatch ? deptMatch[1].trim() : "Not Found";

    // 2. Validate Email Address using Regular Expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = email !== "Not Found" && emailRegex.test(email);

    // 3. Validate Phone Number contains exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    const isPhoneValid = phone !== "Not Found" && phoneRegex.test(phone);

    // 4. Counts
    // Count Words (split by whitespace)
    const wordsArray = rawText.split(/\s+/).filter(word => word.length > 0);
    const wordCount = wordsArray.length;

    // Count Characters excluding spaces
    const charCount = rawText.replace(/\s/g, '').length;

    // 5. Convert text to lowercase
    const lowercaseText = rawText.toLowerCase();

    // 6. Replace "Computer Science" with "Information Technology"
    const replacedText = rawText.replace(/Computer\s+Science/gi, "Information Technology");

    // 6. Display all extracted information in the UI
    document.getElementById('outName').textContent = name;
    document.getElementById('outRoll').textContent = roll;
    document.getElementById('outEmail').textContent = email;
    document.getElementById('outPhone').textContent = phone;
    document.getElementById('outDept').textContent = department;

    // Update Email Validation Badge
    const emailBadge = document.getElementById('badgeEmail');
    if (email === "Not Found") {
        emailBadge.textContent = "Missing";
        emailBadge.className = "badge badge-invalid";
    } else if (isEmailValid) {
        emailBadge.textContent = "Valid";
        emailBadge.className = "badge badge-valid";
    } else {
        emailBadge.textContent = "Invalid";
        emailBadge.className = "badge badge-invalid";
    }

    // Update Phone Validation Badge
    const phoneBadge = document.getElementById('badgePhone');
    if (phone === "Not Found") {
        phoneBadge.textContent = "Missing";
        phoneBadge.className = "badge badge-invalid";
    } else if (isPhoneValid) {
        phoneBadge.textContent = "Valid";
        phoneBadge.className = "badge badge-valid";
    } else {
        phoneBadge.textContent = "Invalid";
        phoneBadge.className = "badge badge-invalid";
    }

    // Update Counts
    document.getElementById('outWords').textContent = wordCount;
    document.getElementById('outChars').textContent = charCount;

    // Update Transformations
    document.getElementById('outLowercase').textContent = lowercaseText;
    document.getElementById('outReplaced').textContent = replacedText;

    // Show the results section
    const resultsSec = document.getElementById('resultsSection');
    resultsSec.classList.remove('hidden');
}
