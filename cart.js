"use strict";

// Sample cart data (replace this with your actual cart data)
const cartItems = [
    { id: 1, name: 'Speaker', price: 299.99, quantity: 2, image: 'images/marshall-extension-speaker.avif' },
    { id: 2, name: 'Guitar', price: 199.99, quantity: 1, image: 'images/LPS500TFNH1_front_copy.png' },
];

// Function to display cart items
function displayCartItems() {
    // Get references to DOM elements
    const cartTable = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Initialize total
    let total = 0;

    // Clear existing cart items
    cartTable.innerHTML = '';

    // Loop through cart items and display them
    cartItems.forEach(item => {
        // Calculate total price for the item
        const totalItemPrice = item.price * item.quantity;
        total += totalItemPrice;

        // Create a table row for each item
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><img src="${item.image}" alt="${item.name}" class="product-image"></td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>$${totalItemPrice.toFixed(2)}</td>
            <td><button onclick="removeItem(${item.id})">Remove</button></td>
        `;

        // Append the row to the table
        cartTable.appendChild(row);
    });

    // Update the total display
    cartTotalElement.textContent = total.toFixed(2);
}

// Function to update quantity of an item in the cart
function updateQuantity(itemId, newQuantity) {
    // Find the item in the cart
    const item = cartItems.find(item => item.id === itemId);

    // Update quantity if the item is found
    if (item) {
        item.quantity = parseInt(newQuantity, 10);
        displayCartItems();
    }
}

// Function to remove item from the cart
function removeItem(itemId) {
    // Find the index of the item in the cart
    const itemIndex = cartItems.findIndex(item => item.id === itemId);

    // Remove the item if found
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        displayCartItems();
    }
}

// Function to simulate checkout (replace with actual checkout logic)
function checkout() {
    // Store cart data in session storage
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Redirect to the payment page
    window.location.href = 'payment.html';
}

// Initial display of cart items
displayCartItems();
