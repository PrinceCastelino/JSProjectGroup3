"use strict";
// Function to update the cart count
function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = count;
}

// Function to handle adding items to the cart
function addItemToCart() {
    let count = parseInt(document.querySelector('.cart-count').textContent);
    count++;
    updateCartCount(count);
}

// Function to initialize the cart functionality
function initializeCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addItemToCart);
    });
}

// Call the initializeCart function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});
