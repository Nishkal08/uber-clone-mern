const Stripe = require("stripe");

const router = require("express").Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount } = req.body; 

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Ride Fare",
            },
            unit_amount: amount * 100, // convert rupees to paise
          },
          quantity: 1,
        },
      ],
      automatic_payment_methods: { enabled: true }, 
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/test", async (req, res) => {
  try {
    res.status(200).json({ message: "Payment route working" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
