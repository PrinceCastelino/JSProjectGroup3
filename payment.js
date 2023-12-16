"use strict";
let totalPrice;

window.onload = function () {
    showPaymentOption('debit-card');
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

document.getElementById('sidebarCollapseBtn').addEventListener('click', function () {
    document.querySelector('.main').classList.toggle('collapsed');
});

function showPaymentOption(option) {
    var paymentOptions = document.querySelectorAll('.payment-option');
    for (var i = 0; i < paymentOptions.length; i++) {
        paymentOptions[i].style.display = 'none';
    }

    document.getElementById(option).style.display = 'block';
}

function updatePaymentOption(option) {
    return function(event) {
        event.preventDefault();
        showPaymentOption(option);
    };
}

function generateRandomOrderId() {
    // Generate a random 8-character alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let orderId = '';
    for (let i = 0; i < 8; i++) {
        orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderId;
}

function paymentSuccess() {
    // Call this function when payment is successful
    const orderId = generateRandomOrderId();

    // Store the order ID in a variable or use it as needed
    console.log('Order ID:', orderId);

    // You can also display the order ID on the page if needed
    // alert('Payment successful! Your Order ID is: ' + orderId);

    const queryString = `orderId=${orderId}&totalPrice=${totalPrice.toFixed(2)}`;

    // Redirect to receipt.html with the query string
    window.location.href = `receipt.html?${queryString}`;
}

function showErrorPopup(errorMessage) {
    const errorPopup = document.getElementById('errorPopup');
    const errorPopupContent = document.getElementById('errorPopupContent');
    
    const errorLines = errorMessage.split('\n');

    // Set innerHTML directly for each line
    errorPopupContent.innerHTML = errorLines.map(line => `${line}<br>`).join('');

    errorPopupContent.textContent = errorMessage;
    errorPopup.style.display = 'block';
}

function closeErrorPopup() {
    const errorPopup = document.getElementById('errorPopup');
    errorPopup.style.display = 'none';
}

document.querySelector('a[data-option="debit-card"]').addEventListener('click', updatePaymentOption('debit-card'));
document.querySelector('a[data-option="credit-card"]').addEventListener('click', updatePaymentOption('credit-card'));
document.querySelector('a[data-option="interac"]').addEventListener('click', updatePaymentOption('interac'));

document.getElementById('debitCardButton').addEventListener('click', function (event) {
    validateDebitCard();
});

document.getElementById('creditCardButton').addEventListener('click', function (event) {
   validateCreditCard();
});

document.getElementById('interacButton').addEventListener('click', function (event) {
  validateInterac();
});

function validateDebitCard() {
    const debitCardNumber = document.getElementById('debitCardNumber').value;
    const debitCardExpiry = document.getElementById('debitCardExpiry').value;
    const debitCardCvv = document.getElementById('debitCardCvv').value;

    let errorMessage = '';

    if (debitCardNumber.length !== 16) {
        errorMessage += 'Card number must be 16 digits\n';
    }

    if (!isValidExpiry(debitCardExpiry)) {
        errorMessage += 'Invalid expiry date\n';
    }

    if (!isValidCVV(debitCardCvv)) {
        errorMessage += 'Invalid CVV\n';
    }

    if (errorMessage) {
        showErrorPopup('Validation Error:\n' + errorMessage);
    } else {
        paymentSuccess();
    }
}

function validateCreditCard() {
    const creditCardNumber = document.getElementById('creditCardNumber').value;
    const creditCardExpiry = document.getElementById('creditCardExpiry').value;
    const creditCardCvv = document.getElementById('creditCardCvv').value;

    let errorMessage = '';

    if (creditCardNumber.length !== 16) {
        errorMessage += 'Card number must be 16 digits\n';
    }

    if (!isValidExpiry(creditCardExpiry)) {
        errorMessage += 'Invalid expiry date\n';
    }

    if (!isValidCVV(creditCardCvv)) {
        errorMessage += 'Invalid CVV\n';
    }

    if (errorMessage) {
        showErrorPopup('Validation Error:\n' + errorMessage);
    } else {
        paymentSuccess();
    }
}

function validateInterac() {
    const referenceId = document.getElementById('interacReferenceId').value;

    let errorMessage = '';

    if (!/^[A-Za-z0-9]{12}$/.test(referenceId)) {
        errorMessage += 'Reference ID must be 12 characters alphanumeric\n';
    }

    if (errorMessage) {
        showErrorPopup('Validation Error:\n' + errorMessage);
    } else {
        paymentSuccess();
    }
}

function isValidExpiry(expiry) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!regex.test(expiry)) {
        return false; // Invalid format
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

    const [inputMonth, inputYear] = expiry.split('/').map(Number);

    return inputYear > currentYear || (inputYear === currentYear && inputMonth >= currentMonth);
}

function isValidCVV(cvv) {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvv);
}
