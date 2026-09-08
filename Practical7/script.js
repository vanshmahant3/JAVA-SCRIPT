// =========================================================================
// Practical 11: Form Elements, Validation & Events (Compact ~95 Lines)
// a) Access & manipulate form elements | b) Validate input | c) Form events
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. ACCESSING FORM ELEMENTS
    const form = document.getElementById('signup-form');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repassword = document.getElementById('re-password');
    const day = document.getElementById('dob-day');
    const month = document.getElementById('dob-month');
    const year = document.getElementById('dob-year');
    const terms = document.getElementById('terms');
    const birthdayDisplay = document.getElementById('birthday-display');
    const successBanner = document.getElementById('success-banner');
    const allInputs = [firstname, lastname, username, email, password, repassword];

    // 2. MANIPULATING FORM ELEMENTS (Populating Dropdowns & Attribute Changes)
    for (let i = 1; i <= 31; i++) day.innerHTML += `<option value="${i}">${i}</option>`;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    months.forEach(m => month.innerHTML += `<option value="${m}">${m}</option>`);
    for (let y = 2026; y >= 1970; y--) year.innerHTML += `<option value="${y}">${y}</option>`;

    // Password Show/Hide Attribute Manipulation
    document.getElementById('toggle-password').onclick = () => {
        password.type = password.type === 'password' ? 'text' : 'password';
    };
    document.getElementById('toggle-repassword').onclick = () => {
        repassword.type = repassword.type === 'password' ? 'text' : 'password';
    };

    // Helper functions to show & clear error styling
    function setError(input, errorId, msg) {
        if (input) input.classList.add('error-field');
        const span = document.getElementById(errorId);
        if (span) { span.textContent = msg; span.classList.add('active'); }
    }

    function clearError(input, errorId) {
        if (input) input.classList.remove('error-field');
        const span = document.getElementById(errorId);
        if (span) { span.textContent = ''; span.classList.remove('active'); }
    }

    // 3. VALIDATION LOGIC
    function validateInput(input) {
        const val = input.value.trim();
        if (input === firstname && val === '') return setError(input, 'firstname-error', 'First name is required!'), false;
        if (input === username && val.length < 3) return setError(input, 'username-error', 'Username must be at least 3 characters!'), false;
        if (input === email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return setError(input, 'email-error', 'Enter a valid email!'), false;
        if (input === password && val.length < 6) return setError(input, 'password-error', 'Password must be at least 6 characters!'), false;
        if (input === repassword && val !== password.value.trim()) return setError(input, 're-password-error', 'Passwords do not match!'), false;
        clearError(input, `${input.id}-error`);
        return true;
    }

    // 4. FORM EVENTS USAGE (focus, blur, change, input, reset, submit)
    
    // A. FOCUS & BLUR Events
    allInputs.forEach(input => {
        input.addEventListener('focus', () => input.classList.add('focused-field'));
        input.addEventListener('blur', () => {
            input.classList.remove('focused-field');
            validateInput(input);
        });
    });

    // B. CHANGE Event (Dropdowns, Radios, Checkbox)
    [day, month, year].forEach(sel => {
        sel.addEventListener('change', () => {
            birthdayDisplay.innerHTML = `Selected Birthday: <span>${day.value} ${month.value} ${year.value}</span>`;
            if (day.value && month.value && year.value) clearError(null, 'birthday-error');
        });
    });

    document.querySelectorAll('input[name="gender"]').forEach(r => {
        r.addEventListener('change', () => clearError(null, 'gender-error'));
    });

    terms.addEventListener('change', () => {
        if (terms.checked) clearError(terms, 'terms-error');
    });

    // C. INPUT Event (Real-time live typing validation)
    email.addEventListener('input', () => validateInput(email));
    password.addEventListener('input', () => validateInput(password));
    repassword.addEventListener('input', () => validateInput(repassword));

    // D. RESET Event (Clears all errors on reset)
    form.addEventListener('reset', () => {
        setTimeout(() => {
            document.querySelectorAll('.error-msg').forEach(s => { s.textContent = ''; s.classList.remove('active'); });
            allInputs.forEach(i => i.classList.remove('error-field', 'focused-field'));
            birthdayDisplay.innerHTML = 'Selected Birthday: <span>Not set</span>';
            successBanner.classList.add('hidden');
        }, 10);
    });

    // E. FILL SAMPLE DATA (Programmatic value manipulation)
    document.getElementById('fill-sample-btn').onclick = () => {
        firstname.value = 'VANSH'; lastname.value = 'MAHANT'; username.value = 'van_77';
        email.value = 'vansh@example.com'; password.value = '123456'; repassword.value = '123456';
        day.value = '15'; month.value = 'Aug'; year.value = '2000';
        document.querySelector('input[name="gender"][value="Male"]').checked = true;
        terms.checked = true;
        birthdayDisplay.innerHTML = 'Selected Birthday: <span>15 Aug 2000</span>';
    };

    // F. SUBMIT Event (Final validation & processing)
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents page reload
        let valid = true;

        allInputs.forEach(input => { if (!validateInput(input)) valid = false; });
        if (!document.querySelector('input[name="gender"]:checked')) { setError(null, 'gender-error', 'Select Gender!'); valid = false; }
        if (!day.value || !month.value || !year.value) { setError(null, 'birthday-error', 'Complete DOB required!'); valid = false; }
        if (!terms.checked) { setError(terms, 'terms-error', 'Accept terms & conditions!'); valid = false; }

        if (valid) {
            successBanner.classList.remove('hidden');
            alert(`Registration Successful for ${firstname.value} (${username.value})!`);
        } else {
            successBanner.classList.add('hidden');
        }
    });
});
