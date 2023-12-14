"use strict";
$(document).ready(() => {
   //if user press login open login form
   $('#switchToLogin').click(() => {
      $('#loginform').slideUp(2000, () => {
         $('#signupForm').slideDown(2000).removeClass('hidden');
      });

   });
   //if user press signup open signup form 
   $('#switchToSignup').click(() => {
      $('#signupForm').slideUp(2000, () => {
         $('#loginform').slideDown(2000).removeClass('hidden');
      });

   });

   function showSuccessMessage() {
      // Display success message with animation
      $("#successMessage").text("Successfully signed up!");
      $("#successMessage").fadeIn(2000, function () {
         // Hide the success message after 5 seconds
         setTimeout(function () {
            $("#successMessage").fadeOut(2000);
         }, 5000);
      });
     
        
   }
   // the handler for the click event of the submit button
   $("#signupForm").submit(event => {
      let isValid = true;

      // validate the email entry with a regular expression
      const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
      const email = $("#email").val().trim();

      if (email == "") {
         $("#email").next().text("This field is required.");
         isValid = false;
      } else if (!emailPattern.test(email)) {
         $("#email").next().text("Must be a valid email address.");
         isValid = false;
      } else {
         $("#email").next().text("");
      }
      $("#email").val(email);

      // validate the password entry
      const password = $("#password").val().trim();
      if (password.length < 6) {
         $("#password").next().text("Must be 6 or more characters.");
         isValid = false;
      } else {
         $("#password").next().text("");
      }
      $("#password").val(password);

      // validate the verify entry
      const verify = $("#verify").val().trim();
      if (verify == "") {
         $("#verify").next().text("This field is required.");
         isValid = false;
      } else if (verify !== password) {
         $("#verify").next().text("Must match first password entry.");
         isValid = false;
      } else {
         $("#verify").next().text("");
         
      }
      $("#verify").val(verify);

      $("#signupForm").submit(event => {
       
      });

      // validate the first name entry
      const firstName = $("#first_name").val().trim();
      if (firstName == "") {
         $("#first_name").next().text("This field is required.");
         isValid = false;
      } else {
         $("#first_name").next().text("");
      }
      $("#first_name").val(firstName);

      // validate the last name entry
      const lastName = $("#last_name").val().trim();
      if (lastName == "") {
         $("#last_name").next().text("This field is required.");
         isValid = false;
      } else {
         $("#last_name").next().text("");
      }
      $("#last_name").val(lastName);

      // validate the phone number with a regular expression
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      const phone = $("#phone").val().trim();
      if (phone == "") {
         $("#phone").next().text("This field is required.");
         isValid = false;
      } else if (!phonePattern.test(phone)) {
         $("#phone").next().text("Use 999-999-9999 format.");
         isValid = false;
      } else {
         $("#phone").next().text("");
      }
      $("#phone").val(phone);


      // prevent the submission of the form if any entries are invalid 
      if (isValid == false) {
         event.preventDefault();
      }

      if (isValid) {
         event.preventDefault();
         showSuccessMessage();
         $("#loginform").removeClass('hidden');
         $("#signupForm").addClass('hidden');

      }

   });

   // the handler for the click event of the submit button
   $("#loginform").submit(event => {
      let isValid = true;

      // validate the email entry with a regular expression
      const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
      const email = $("#l_email").val().trim();

      if (email == "") {
         $("#l_email").next().text("This field is required.");
         isValid = false;
      } else if (!emailPattern.test(email)) {
         $("#l_email").next().text("Must be a valid email address.");
         isValid = false;
      } else {
         $("#l_email").next().text("");
      }
      $("#l_email").val(email);

      // validate the password entry
      const password = $("#l_password").val().trim();
      if (password.length < 6) {
         $("#l_password").next().text("Must be 6 or more characters.");
         isValid = false;
      } else {
         $("#l_password").next().text("");
      }
      $("#l_password").val(password);


      // prevent the submission of the form if any entries are invalid 
      if (isValid == false) {
         event.preventDefault();
      }

      if (isValid) {
         event.preventDefault();
         const username = 'user@example.com'; // Replace with the actual username
         const password = 'password'; // Replace with the actual password

         if (email === username && password === $("#l_password").val().trim()) {
            // Redirect to index.html on successful login
            window.location.href = 'index.html';
         } else {
            // Display an error message or handle unsuccessful login
            console.log('Invalid credentials. Please try again.');
            // Show the success message for demonstration purposes (Remove in production)
            showSuccessLoginMessage();
         }
      }

   });

 

   function showSuccessLoginMessage() {
      // Display success message with animation
      $("#successMessage").text("Successfully Login!");
      $("#successMessage").fadeIn(2000, function () {
         // Hide the success message after 5 seconds
         setTimeout(function () {
            $("#successMessage").fadeOut(2000);
         }, 5000);
      });
   }
});