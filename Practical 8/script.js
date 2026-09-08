// ========================================================
// Practical 8: Gym Admission Registration Form
// Demonstrating JavaScript Events & Form Validation
// ========================================================

document.addEventListener("DOMContentLoaded", function () {
    // Form and input elements
    const form = document.getElementById("gymRegistrationForm");
    const fullNameInput = document.getElementById("fullName");
    const sexRadios = document.querySelectorAll('input[name="sex"]');
    const eyeColorSelect = document.getElementById("eyeColor");
    const attributeCheckboxes = document.querySelectorAll('input[name="attributes"]');
    const athleticAbilityTextarea = document.getElementById("athleticAbility");
    const charCountSpan = document.getElementById("charCount");
    const resultCard = document.getElementById("resultCard");
    const summaryDetails = document.getElementById("summaryDetails");

    // Error message elements
    const nameError = document.getElementById("nameError");
    const sexError = document.getElementById("sexError");
    const abilityError = document.getElementById("abilityError");
    const eyeColorStatus = document.getElementById("eyeColorStatus");
    const attrCount = document.getElementById("attrCount");

    // ----------------------------------------------------
    // 1. Validation Helper Functions
    // ----------------------------------------------------

    // Validate Full Name
    function validateName() {
        const value = fullNameInput.value.trim();
        const nameRegex = /^[A-Za-z\s]+$/;

        if (value === "") {
            nameError.textContent = "Name is required.";
            fullNameInput.classList.add("is-invalid");
            fullNameInput.classList.remove("is-valid");
            return false;
        } else if (value.length < 3) {
            nameError.textContent = "Name must be at least 3 characters long.";
            fullNameInput.classList.add("is-invalid");
            fullNameInput.classList.remove("is-valid");
            return false;
        } else if (!nameRegex.test(value)) {
            nameError.textContent = "Name must contain only alphabets and spaces.";
            fullNameInput.classList.add("is-invalid");
            fullNameInput.classList.remove("is-valid");
            return false;
        } else {
            nameError.textContent = "";
            fullNameInput.classList.remove("is-invalid");
            fullNameInput.classList.add("is-valid");
            return true;
        }
    }

    // Validate Sex selection
    function validateSex() {
        let isSelected = false;
        sexRadios.forEach((radio) => {
            if (radio.checked) isSelected = true;
        });

        if (!isSelected) {
            sexError.textContent = "Please select your gender.";
            return false;
        } else {
            sexError.textContent = "";
            return true;
        }
    }

    // Validate Athletic Ability
    function validateAthleticAbility() {
        const value = athleticAbilityTextarea.value.trim();

        if (value === "") {
            abilityError.textContent = "Please describe your athletic ability.";
            athleticAbilityTextarea.classList.add("is-invalid");
            athleticAbilityTextarea.classList.remove("is-valid");
            return false;
        } else if (value.length < 10) {
            abilityError.textContent = "Description must be at least 10 characters long.";
            athleticAbilityTextarea.classList.add("is-invalid");
            athleticAbilityTextarea.classList.remove("is-valid");
            return false;
        } else {
            abilityError.textContent = "";
            athleticAbilityTextarea.classList.remove("is-invalid");
            athleticAbilityTextarea.classList.add("is-valid");
            return true;
        }
    }

    // ----------------------------------------------------
    // 2. JavaScript Events Demonstration
    // ----------------------------------------------------

    // EVENT 1: 'input' event on Full Name (real-time validation)
    fullNameInput.addEventListener("input", function () {
        validateName();
    });

    // EVENT 2: 'blur' event on Full Name (validation on leaving field)
    fullNameInput.addEventListener("blur", function () {
        validateName();
    });

    // EVENT 3: 'focus' event on Full Name & Textarea (visual highlight)
    fullNameInput.addEventListener("focus", function () {
        if (nameError.textContent === "") {
            fullNameInput.classList.remove("is-invalid");
        }
    });

    // EVENT 4: 'change' event on Sex radio buttons
    sexRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            validateSex();
        });
    });

    // EVENT 5: 'change' event on Eye Color dropdown
    eyeColorSelect.addEventListener("change", function () {
        eyeColorStatus.textContent = `Selected: ${this.value}`;
        setTimeout(() => {
            eyeColorStatus.textContent = "";
        }, 2000);
    });

    // EVENT 6: 'change' event on Checkboxes (Attributes)
    attributeCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const selectedCount = Array.from(attributeCheckboxes).filter(cb => cb.checked).length;
            attrCount.textContent = `${selectedCount} option(s) selected`;
            setTimeout(() => {
                attrCount.textContent = "";
            }, 2000);
        });
    });

    // EVENT 7: 'input' & 'keyup' events on Athletic Ability textarea (Character counter)
    athleticAbilityTextarea.addEventListener("input", function () {
        const length = this.value.length;
        charCountSpan.textContent = length;
        validateAthleticAbility();
    });

    // EVENT 8: 'submit' event on Form
    form.addEventListener("submit", function (e) {
        // Prevent default browser form submission
        e.preventDefault();

        // Perform all validations
        const isNameValid = validateName();
        const isSexValid = validateSex();
        const isAbilityValid = validateAthleticAbility();

        if (isNameValid && isSexValid && isAbilityValid) {
            // Collect Form Values
            const nameVal = fullNameInput.value.trim();
            const sexVal = document.querySelector('input[name="sex"]:checked')?.value || "Not specified";
            const eyeColorVal = eyeColorSelect.value;
            
            const selectedAttributes = Array.from(attributeCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            const attributesVal = selectedAttributes.length > 0 ? selectedAttributes.join(", ") : "None";

            const abilityVal = athleticAbilityTextarea.value.trim();

            // Display Summary Details
            summaryDetails.innerHTML = `
                <div class="summary-item"><strong>Full Name:</strong> ${nameVal}</div>
                <div class="summary-item"><strong>Sex:</strong> ${sexVal}</div>
                <div class="summary-item"><strong>Eye Color:</strong> ${eyeColorVal}</div>
                <div class="summary-item"><strong>Attributes:</strong> ${attributesVal}</div>
                <div class="summary-item"><strong>Athletic Ability:</strong> ${abilityVal}</div>
            `;

            resultCard.style.display = "block";
            resultCard.scrollIntoView({ behavior: "smooth" });

            alert("Admission Information submitted successfully!");
        } else {
            resultCard.style.display = "none";
            alert("Please resolve the highlighted errors before submitting.");
        }
    });

    // EVENT 9: 'reset' event on Form
    form.addEventListener("reset", function () {
        // Clear all validation errors and states
        nameError.textContent = "";
        sexError.textContent = "";
        abilityError.textContent = "";
        eyeColorStatus.textContent = "";
        attrCount.textContent = "";
        charCountSpan.textContent = "0";

        fullNameInput.classList.remove("is-valid", "is-invalid");
        athleticAbilityTextarea.classList.remove("is-valid", "is-invalid");

        resultCard.style.display = "none";
        summaryDetails.innerHTML = "";
    });
});
