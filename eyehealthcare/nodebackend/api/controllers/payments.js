const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.stripe = async (req, res) => {
    try{
        const { product } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "mwk",
                        product_data: {
                            name: product.name,
                            images: [product.image],
                        },
                        unit_amount: product.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5000/success`,
            cancel_url: `http://localhost:5000/cancel`,
        });
            
        return res.status(200).json({checkout_url: session.url});

    }catch(e){
        console.log(e.message);
        return res.status(500).json({result:false,message:""});
    }
}