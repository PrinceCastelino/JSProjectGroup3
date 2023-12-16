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
      $("#successMessage").text("Successfully signed up!");
      $("#successMessage").fadeIn(2000, function () {
         setTimeout(function () {
            $("#successMessage").fadeOut(2000);
         }, 5000);
      });
     
   }
   // set the handler event for the submit button
   $("#signupForm").submit(event => {
      let isValid = true;

      // verify the email entry with a regular expression
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

      // verify the password entry
      const password = $("#password").val().trim();
      if (password.length < 6) {
         $("#password").next().text("Must be 6 or more characters.");
         isValid = false;
      } else {
         $("#password").next().text("");
      }
      $("#password").val(password);

      // verify entry
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

      // verify the first name with the complete regular expression
      const firstName = $("#first_name").val().trim();
      const fnamePattern = /^[^\s!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]*$/;

      if (firstName == "") {
         $("#first_name").next().text("This field is required.");
         isValid = false;
      } else if (!fnamePattern.test(firstName)){
         $("#first_name").next().text("Invalid characters in the first name.");
         isValid = false;
      } else {
         $("#first_name").next().text("");
      } 
      $("#first_name").val(firstName);

      // verify the last name with the complete regular expression
      const lastName = $("#last_name").val().trim();
      const lnamePattern = /^[^\s!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]*$/;

      if (lastName == "") {
         $("#last_name").next().text("This field is required.");
         isValid = false;
      } else if (!lnamePattern.test(lastName)) {
         $("#last_name").next().text("Invalid characters in the last name.");
         isValid = false;
      } else {
         $("#last_name").next().text("");
      }
      $("#last_name").val(lastName);

      // verify the phone number with a complete regular expression
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


      // when any entries are invalid to stop the prevent event 
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

   // set the handler event for the submit button
   $("#loginform").submit(event => {
      let isValid = true;

      // verify the email entry with a complete regular expression
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

      // verify the password entry
      const password = $("#l_password").val().trim();
      if (password.length < 6) {
         $("#l_password").next().text("Must be 6 or more characters.");
         isValid = false;
      } else {
         $("#l_password").next().text("");
      }
      $("#l_password").val(password);
 
      // when any entries are invalid to stop the prevent event 
      if (isValid == false) {
         event.preventDefault();
      }

      if (isValid) {
         event.preventDefault();
         showSuccessLoginMessage();
      }

   });

   function showSuccessLoginMessage() {
      $("#successMessage").text("Successfully Login!");
      $("#successMessage").fadeIn(2000, function () {
         setTimeout(function () {
            $("#successMessage").fadeOut(2000);
         }, 5000);
      });
   }
});