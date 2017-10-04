'use strict';

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// var stripe = require("stripe")("sk_test_znsDuX15vKRFiGUjwiCUaWTf");

// Commerce.js
//This is the public API key created for our Chec Dummy Account, we have also turned on the console debugger
// var myStore = new Commerce('pk_test_1101361e43dd408534afd852d22f128d0b7aab34d59d6', true);

// moltin

var handler = StripeCheckout.configure({
  key: 'pk_test_Gwv3ccbeaVdcU6bM6iZ5Jl1b',
  image: '/images/logo_paw_original.svg',
  locale: 'auto',
  zipCode: 'true',
  billingAddress: 'true',
  token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.



        var moltin = new Moltin({publicId: 'jgZfUXjhgSXDj8QvSEI6WmcBKQV9crl4y7scRbKNAY'});

        moltin.Authenticate(function() {
          // var item = moltin.Cart.Insert( product[0].id, 1, null);
          moltin.Cart.Delete(function() {
              // Everything is awesome...
          }, function(error) {
              // Something went wrong...
          });
          // Add further calls here
          var product = moltin.Product.Find({ slug: $("input[name=plans]:checked").val() });

          moltin.Cart.Insert( product[0].id, 1, null, function(cart) {
              console.log(cart);
          }, function(error) {
              // Something went wrong...
          });

          // console.log(item);

          var cart = moltin.Cart.Contents();
          console.log(cart);

          moltin.Cart.Complete({
            customer: {
              first_name: 'Jon',
              last_name:  'Doe',
              email:      "enzo@vezzaro"
            },
            shipping: 'free_shipping',
            gateway: 'dummy',
            bill_to: {
              first_name: 'Jon',
              last_name:  'Doe',
              address_1:  '123 Moltin Street',
              city:       'Mountain View',
              county:     'California',
              country:    'US',
              postcode:   'CA94040',
              phone:      '6507123124'
            },
            ship_to: 'bill_to',
          }, function(order) {
              console.log(order);
              moltin.Checkout.Payment('purchase', order.id, {
                data: {
                  first_name:   'John',
                  last_name:    'Doe',
                  number:       '4242424242424242',
                  expiry_month: '08',
                  expiry_year:  '2020',
                  cvv:          '123'
                }
              }, function(payment) {
                  console.log(payment);
              }, function(error) {
                  // Something went wrong...
              });
          }, function(error) {
              // Something went wrong...
          });

        });



  }
});
