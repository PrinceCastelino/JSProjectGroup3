"use strict";

// Define an array to store added products
let cartItems = [];

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

    // Extracting product details and adding to cartItems array
    const productDiv = this.closest('.product');
    const image = productDiv.querySelector('img');
    const productName = productDiv.querySelector('h2').textContent;
    const price = productDiv.querySelector('.product-price').textContent;

    const product = {
        imageUrl: image.src,
        productName: productName,
        amount: price
    };

    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Log the cart items to the console
    console.log("Cart Items:");
    console.log(cartItems);
}

// Function to initialize the cart functionality
function initializeCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addItemToCart);
    });

    // Retrieve cartItems from localStorage and update the cart count
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
        updateCartCount(cartItems.length);
    }
}

// Call the initializeCart function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeCart);
