const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const express = require('express');
const app = express();
const stripe = require("stripe")(keySecret);
const path = require("path");

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// app.use('/static', express.static(path.join(__dirname + 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
//Store all HTML files in view folder.

function sendViewMiddleware(req, res, next) {
    res.sendView = function(view) {
        return res.sendFile( __dirname + "/public" +view );
    }
    next();
}

app.use(sendViewMiddleware);

app.get('/', function(req, res) {
    res.sendView('/index.html');
    console.log("Home");
});

app.get('/sign_up', function(req, res) {

    res.sendView('/sign_up/index.html', {keyPublishable});

    // app.post("/form_1_month", (req, res) => {
    //   let amount = 3090;
    //
    //   stripe.customers.create({
    //      email: req.body.stripeEmail,
    //     source: req.body.stripeToken
    //   })
    //   .then(customer =>
    //     stripe.charges.create({
    //       amount,
    //       description: "1-3 Toys, 1-3 Treats, 1 Surprise",
    //          currency: "usd",
    //          customer: customer.id
    //     }))
    //   .then(charge => res.render("/dashboard"));
    // });

    console.log("sign_up");

});

app.post('/sign_up', function(req, res) {
    var stripeToken = req.body.stripeToken;
    var amount = 1000;

    stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: amount
    },
    function(err, charge) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(204);
        }
    });
});

// app.get("/sign_up", (req, res) => {
//   res.render("index.html", {keyPublishable})
// });


app.get('/dashboard', function(req, res) {
    res.sendView('/dashboard/index.html');
    console.log("dashboard");
});

app.listen(3000);

console.log("Node.js / Express ready ");
