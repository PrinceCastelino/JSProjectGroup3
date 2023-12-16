"use strict";

// Variable to store the total price of items in the cart
let totalPrice;

// Execute the following code when the window has fully loaded
window.onload = function () {
    // Show the payment option for debit card by default
    showPaymentOption('debit-card');

    // Retrieve cart items from session storage
    const storedCartItems = sessionStorage.getItem('cartItems');

    if (storedCartItems) {
        // Parse the JSON string to get the cart data
        const cartItems = JSON.parse(storedCartItems);

        // Calculate the total price to be paid
        totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        // Display the total price in the h1 tag
        document.querySelector('h1').textContent = `Make a Payment of : $${totalPrice.toFixed(2)}`;
    } else {
        // Handle the case when there are no cart items
        console.error('No cart items found.');
    }
};

// Event listener for collapsing/expanding the sidebar
document.getElementById('sidebarCollapseBtn').addEventListener('click', function () {
    document.querySelector('.main').classList.toggle('collapsed');
});

// Function to show a specific payment option and hide others
function showPaymentOption(option) {
    var paymentOptions = document.querySelectorAll('.payment-option');
    for (var i = 0; i < paymentOptions.length; i++) {
        paymentOptions[i].style.display = 'none';
    }

    document.getElementById(option).style.display = 'block';
}

// Function to generate a random order ID
function generateRandomOrderId() {
    // Generate a random 8-character alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let orderId = '';
    for (let i = 0; i < 8; i++) {
        orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderId;
}

// Function to handle payment success
function paymentSuccess() {
    // Call this function when payment is successful
    const orderId = generateRandomOrderId();

    // Store the order ID in a variable or use it as needed
    console.log('Order ID:', orderId);

    // You can also display the order ID on the page if needed
    // alert('Payment successful! Your Order ID is: ' + orderId);

    // Build a query string with order details
    const queryString = `orderId=${orderId}&totalPrice=${totalPrice.toFixed(2)}`;

    // Redirect to receipt.html with the query string
    window.location.href = `receipt.html?${queryString}`;
}

// Function to show error popup with a given error message
function showErrorPopup(errorMessage) {
    const errorPopup = document.getElementById('errorPopup');
    const errorPopupContent = document.getElementById('errorPopupContent');
    
    const errorLines = errorMessage.split('\n');

    // Set innerHTML directly for each line
    errorPopupContent.innerHTML = errorLines.map(line => `${line}<br>`).join('');

    errorPopupContent.textContent = errorMessage;
    errorPopup.style.display = 'block';
}

// Function to close the error popup
function closeErrorPopup() {
    const errorPopup = document.getElementById('errorPopup');
    errorPopup.style.display = 'none';
}

// Event listeners for updating the displayed payment option
document.querySelector('a[data-option="debit-card"]').addEventListener('click', updatePaymentOption('debit-card'));
document.querySelector('a[data-option="credit-card"]').addEventListener('click', updatePaymentOption('credit-card'));
document.querySelector('a[data-option="interac"]').addEventListener('click', updatePaymentOption('interac'));

// Event listeners for payment validation buttons
document.getElementById('debitCardButton').addEventListener('click', validateDebitCard);
document.getElementById('creditCardButton').addEventListener('click', validateCreditCard);
document.getElementById('interacButton').addEventListener('click', validateInterac);

// Function to validate debit card information
function validateDebitCard() {
    const debitCardNumber = document.getElementById('debitCardNumber').value;
    const debitCardExpiry = document.getElementById('debitCardExpiry').value;
    const debitCardCvv = document.getElementById('debitCardCvv').value;

    // Initialize an error message string
    let errorMessage = '';

    // Check if the card number has 16 digits
    if (debitCardNumber.length !== 16) {
        errorMessage += 'Card number must be 16 digits\n';
    }

    // Check if the expiry date is valid
    if (!isValidExpiry(debitCardExpiry)) {
        errorMessage += 'Invalid expiry date\n';
    }

    // Check if the CVV is valid
    if (!isValidCVV(debitCardCvv)) {
        errorMessage += 'Invalid CVV\n';
    }

    // Display an error popup if there are validation errors, otherwise, proceed with payment success
    if (errorMessage) {
        showErrorPopup('Validation Error:\n' + errorMessage);
    } else {
        paymentSuccess();
    }
}

// Function to validate credit card information
function validateCreditCard() {
    const creditCardNumber = document.getElementById('creditCardNumber').value;
    const creditCardExpiry = document.getElementById('creditCardExpiry').value;
    const creditCardCvv = document.getElementById('creditCardCvv').value;

    // Initialize an error message string
    let errorMessage = '';

    // Check if the card number has 16 digits
    if (creditCardNumber.length !== 16) {
        errorMessage += 'Card number must be 16 digits\n';
    }

    // Check if the expiry date is valid
    if (!isValidExpiry(creditCardExpiry)) {
        errorMessage += 'Invalid expiry date\n';
    }

    // Check if the CVV is valid
    if (!isValidCVV(creditCardCvv)) {
        errorMessage += 'Invalid CVV\n';
    }

    // Display an error popup if there are validation errors, otherwise, proceed with payment success
    if (errorMessage) {
        showErrorPopup('Validation Error:\n' + errorMessage);
    } else {
        paymentSuccess();
    }
}

// Function to validate Interac information
function validateInterac() {
    const referenceId = document.getElementById('interacReferenceId').value;

    // Initialize an error message string
    let errorMessage = '';

    // Check if the reference ID is a 12-character alphanumeric code
    if (!/^[A-Za-z0-9]{12}$/.test(referenceId)) {
        errorMessage += 'Reference ID must be 12 characters alphanumeric\n';
    }

    // Display an error popup if there are validation errors, otherwise, proceed with payment success
    if (errorMessage) {
        showErrorPopup('Validation Error:\n' + errorMessage);
    } else {
        paymentSuccess();
    }
}

// Function to check if the expiry date is valid
function isValidExpiry(expiry) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!regex.test(expiry)) {
        return false; // Invalid format
    }

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

    // Split the input expiry date into month and year
    const [inputMonth, inputYear] = expiry.split('/').map(Number);

    // Check if the input expiry date is greater than or equal to the current date
    return inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth);
}

// Function to check if the CVV is valid
function isValidCVV(cvv) {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvv);
}
