<!-- firebase -->
// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '/sign_up',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var providerData = user.providerData;
      user.getToken().then(function(accessToken) {
        document.getElementById('button_access').textContent = 'Dashboard';
        document.getElementById('button_suscriviti').textContent = 'Esci';
        // document.getElementById('account-details').textContent = JSON.stringify({
        //   displayName: displayName,
        //   email: email,
        //   emailVerified: emailVerified,
        //   photoURL: photoURL,
        //   uid: uid,
        //   accessToken: accessToken,
        //   providerData: providerData
        // }, null, '  ');
      });
      $("#button_suscriviti").click(function(){

        firebase.auth().signOut().then(function() {
          button_access = 'Accedi';
          button_suscriviti = 'Suscriviti';
          window.location.href = "/";
          console.log("Log Out!");

        }, function(error) {
        // An error happened.
        });

        console.log("Logged in");

      });

    } else {

      // User is signed out.
      document.getElementById('button_access').textContent = 'Accedi';
      document.getElementById('button_suscriviti').textContent = 'Suscriviti';
      // $('#account-details').textContent = 'null';
      $("#button_suscriviti").click(function(){
        // OAuth
        $(".auth").fadeIn( "10", function() {
          // Animation complete
        });
        $(".firebaseui-container").css("top", "20%");
      });


      if ( window.location.pathname == '/' ) {
        console.log("index");
      } else if ( window.location.pathname == '/dashboard/' ){
        console.log("Dashboard");
        window.location.href = '/';
      } else if ( window.location.pathname == '/sign_up/' ){
        console.log("Sign Up");
        window.location = '/';
      }

      console.log("Log Off");

    }

  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});



// $("#button_suscriviti").click(function(){
//
//   var button_suscriviti = document.getElementById('button_suscriviti');
//   var button_access  = document.getElementById('button_access');
//
//   if ( button_suscriviti.textContent = "Suscriviti" ){
//
//     // OAuth
//     console.log("Log Off");
//
//     $(".auth").fadeIn( "10", function() {
//       // Animation complete
//     });
//     $(".firebaseui-container").css("top", "20%");
//
//
//   } else {
//
//     firebase.auth().signOut().then(function() {
//       button_access = 'Accedi';
//       button_suscriviti = 'Suscriviti';
//       window.location.href = "/";
//       console.log("Log Out!");
//
//     }, function(error) {
//     // An error happened.
//     });
//
//     console.log("Firebase ready");
//   }
// });

$(".auth").click(function(){
  $(".firebaseui-container").css("top", "-100%");
  $(".auth").fadeOut( "10", function() {
    // Animation complete
  });
});
