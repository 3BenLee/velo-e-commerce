const app = require("express")();
const stripe = require("stripe")("sk_test_ExrKm7x2sMmRrnnWG8iqZETP");

app.use(require("body-parser").text());

app.listen(9000, () => console.log("Listening on port 9000"));

app.post("/charge", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });
    console.log(status);
    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});