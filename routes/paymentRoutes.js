const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Order } = require('../models');


router.post('/create-checkout-session', async (req, res) => {
    const { productId, userId, quantity, totalAmount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Product ${productId}`,
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
        });

      
        await Order.create({
            userId,
            productId,
            quantity,
            totalAmount,
            status: 'pending',
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: 'Payment session creation failed' });
    }
});


router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            await Order.update(
                { status: 'paid' },
                { where: { id: session.metadata.orderId } }
            );
        }

        res.status(200).send();
    } catch (error) {
        console.error('Webhook error:', error.message);
        res.status(400).send(`Webhook error: ${error.message}`);
    }
});

module.exports = router;
