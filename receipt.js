"use strict";
   // Retrieve data from the query string
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);

   // Get values using the parameter names (e.g., orderId, totalPrice)
   const orderId = urlParams.get('orderId');
   const totalPrice = urlParams.get('totalPrice');

   // Retrieve cart data from session storage
   const storedCartItems = sessionStorage.getItem('cartItems');

   let cartItems; // Declare a variable to store cart items

   if (storedCartItems) {
       // Parse the JSON string to get the cart data
       cartItems = JSON.parse(storedCartItems);

       // Update HTML content with retrieved data
       document.getElementById('orderId').textContent = orderId;

       const cartItemsBody = document.getElementById('cartItemsBody');
       const totalContainer = document.getElementById('totalPrice');

       // Loop through cart items and display them
       cartItems.forEach(item => {
           const row = document.createElement('tr');

           row.innerHTML = `
               <td><img src="${item.image}" alt="${item.name}"></td>
               <td>${item.name}</td>
               <td>$${item.price.toFixed(2)}</td>
               <td>${item.quantity}</td>
               <td>$${(item.price * item.quantity).toFixed(2)}</td>
           `;

           cartItemsBody.appendChild(row);
       });

       totalContainer.textContent = totalPrice;
   } else {
       // Handle the case when there are no cart items
       console.error('No cart items found.');
   }

   function printInvoice() {
       window.print();
   }