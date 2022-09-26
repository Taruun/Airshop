import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const session = getSession(req, res);
  const user = session?.user;
  if (user) {
    const stripeId = user["http://localhost:3000/stripe_customer_id"];
    if (req.method === "POST") {
      try {
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          mode: "payment",
          customer: stripeId,
          payment_method_types: ["card"],
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: ["US", "CA", "FR", "IN", "GR", "JP", "RO", "LU"],
          },

          allow_promotion_codes: true,
          shipping_options: [
            { shipping_rate: "shr_1LjzVmSDqBi8pUd7Y7hXIJvt" },
            { shipping_rate: "shr_1Ljzi9SDqBi8pUd7pCMvK5D4" },
          ],

          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "cad",
                product_data: {
                  name: item.title,
                  images: [item.image.data[0].attributes.formats.thumbnail.url],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            };
          }),
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/canceled`,
        });
        res.status(200).json(session);
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  } else {
    if (req.method === "POST") {
      try {
        const session = await stripe.checkout.sessions.create({
          submit_type: "pay",
          mode: "payment",
          payment_method_types: ["card"],
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: ["US", "CA", "FR", "IN", "GR", "JP", "RO", "LU"],
          },

          allow_promotion_codes: true,
          shipping_options: [
            { shipping_rate: "shr_1LjzVmSDqBi8pUd7Y7hXIJvt" },
            { shipping_rate: "shr_1Ljzi9SDqBi8pUd7pCMvK5D4" },
          ],

          line_items: req.body.map((item) => {
            return {
              price_data: {
                currency: "cad",
                product_data: {
                  name: item.title,
                  images: [item.image.data[0].attributes.formats.thumbnail.url],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            };
          }),
          success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/canceled`,
        });
        res.status(200).json(session);
      } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
      }
    }
  }
}
