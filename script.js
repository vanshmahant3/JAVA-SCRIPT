document.addEventListener('DOMContentLoaded', () => {
    // 1. Primitive Data Types Implementation
    // Declare different primitive variable types
    const stringVar = "Adarsh";
    const numberVar = 1000;
    const booleanVar = true;
    const undefinedVar = undefined;
    const nullVar = null;

    // Display values on page load
    document.getElementById('stringVal').textContent = stringVar;
    document.getElementById('numberVal').textContent = numberVar;
    document.getElementById('booleanVal').textContent = String(booleanVar);
    document.getElementById('undefinedVal').textContent = String(undefinedVar);
    document.getElementById('nullVal').textContent = String(nullVar);

    // 2. Type Conversion Implementation
    const typeInput = document.getElementById('typeInput');
    const btnCheckType = document.getElementById('btnCheckType');
    const typeResultBox = document.getElementById('typeResultBox');
    const beforeType = document.getElementById('beforeType');
    const afterType = document.getElementById('afterType');

    btnCheckType.addEventListener('click', () => {
        const val = typeInput.value;
        
        // Input values are captured as string type by default from the DOM
        beforeType.textContent = typeof val;

        // Convert the string to a number explicitly using Number()
        const convertedVal = Number(val);
        afterType.textContent = typeof convertedVal;

        // Show the results box
        typeResultBox.style.display = 'block';
    });

    // Run check type once automatically to display initial state
    btnCheckType.click();

    // 3. Shopping Bill Implementation
    const price1Input = document.getElementById('price1Input');
    const price2Input = document.getElementById('price2Input');
    const qtyInput = document.getElementById('qtyInput');
    const paymentDropdown = document.getElementById('paymentDropdown');
    const btnCalculateBill = document.getElementById('btnCalculateBill');
    const billResultBox = document.getElementById('billResultBox');

    const subtotalOutput = document.getElementById('subtotalOutput');
    const discountPercent = document.getElementById('discountPercent');
    const discountOutput = document.getElementById('discountOutput');
    const payableOutput = document.getElementById('payableOutput');

    btnCalculateBill.addEventListener('click', () => {
        // Read input values and convert them explicitly from string to number
        const price1 = parseFloat(price1Input.value) || 0;
        const price2 = parseFloat(price2Input.value) || 0;
        const qty = parseInt(qtyInput.value) || 0;
        const paymentMethod = paymentDropdown.value;

        // Calculate Subtotal using the formula: (Price 1 + Price 2) * Quantity
        const subtotal = (price1 + price2) * qty;

        // Determine discount percentage using conditional statements
        let discountRate = 0;
        if (paymentMethod === "Cash") {
            discountRate = 0.10; // 10% discount
        } else if (paymentMethod === "Card") {
            discountRate = 0.05;  // 5% discount
        } else if (paymentMethod === "UPI") {
            discountRate = 0.15;  // 15% discount
        }

        const discountAmount = subtotal * discountRate;
        const totalPayable = subtotal - discountAmount;

        // Format and display the results
        subtotalOutput.textContent = `₹${subtotal.toFixed(2)}`;
        discountPercent.textContent = `${discountRate * 100}%`;
        discountOutput.textContent = `₹${discountAmount.toFixed(2)}`;
        payableOutput.textContent = `₹${totalPayable.toFixed(2)}`;

        // Show the results box
        billResultBox.style.display = 'block';
    });
});
