import { useRouter } from "next/router";
import styled from "styled-components";
const { motion } = require("framer-motion");
import Image from "next/image";
import sponge from "../public/spongebob.png";
import Head from "next/head";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}

const Success = ({ order }) => {
  const route = useRouter();
  return (
    <>
      <Head>
        <title>Airshop | Success</title>
        <meta name="description" content="title" />
      </Head>
      <main>
        <Wrapper
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.75 }}
        >
          <h1>Thank you for your order!</h1>
          <p>
            A confirmation mail has been sent to:{" "}
            <span className="email">{order.customer_details.email}</span>.
          </p>
          <Address>
            <Shipping>
              <h3>Sent to:</h3>
              <p>{order.shipping_details.name}</p>
              <p>{order.shipping_details.address.line1}</p>
              <p>{order.shipping_details.address.line2}</p>
              <p>{order.shipping_details.address.city}</p>
              <p>{order.shipping_details.address.state}</p>
              <p>{order.shipping_details.address.postal_code}</p>
              <p>{order.shipping_details.address.country}</p>
            </Shipping>
            <Billing>
              <h3>Invoice:</h3>
              <p>{order.customer_details.name}</p>
              <p>{order.customer_details.address.line1}</p>
              <p>{order.customer_details.address.line2}</p>
              <p>{order.customer_details.address.city}</p>
              <p>{order.customer_details.address.state}</p>
              <p>{order.customer_details.address.postal_code}</p>
              <p>{order.customer_details.address.country}</p>
            </Billing>
          </Address>
          <Details>
            <h3>Details of order:</h3>

            {order.line_items.data.map((item) => (
              <Item key={item.id}>
                <p>Product: {item.description}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: {item.price.unit_amount / 100} $</p>
              </Item>
            ))}

            <h3>Summary of order:</h3>
            <p>Sub-total : ${order.amount_subtotal / 100}</p>

            {order.total_details.amount_discount > 0 && (
              <p>Discount : -${order.total_details.amount_discount / 100}</p>
            )}

            <p>Shipping: ${order.total_details.amount_shipping / 100}</p>
            <p className="total">Total: ${order.amount_total / 100}</p>

            <Image src={sponge} alt={"SpongeBob"} width={100} height={90} />
          </Details>

          <Button onClick={() => route.push("/")}>Continue Shopping</Button>
        </Wrapper>
      </main>
    </>
  );
};

export default Success;

const Wrapper = styled(motion.div)`
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  width: 40%;
  background: white;
  @media screen and (max-width: 1400px) {
    width: 60%;
  }

  @media screen and (max-width: 1200px) {
    width: 75%;
  }

  @media screen and (max-width: 960px) {
    width: 80%;
  }

  @media screen and (max-width: 900px) {
    width: 90%;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }

  .email {
    font-weight: bold;
  }
`;

const Address = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const Shipping = styled.div`
  padding-right: 1rem;
`;

const Billing = styled.div`
  padding-left: 1rem;

  @media screen and (max-width: 600px) {
    padding: 1rem 0;
  }
`;

const Details = styled.div`
  margin: 1rem 0;

  .total {
    font-weight: bold;
  }
`;

const Item = styled.div`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background: black;
  color: white;
  border: none;
  outline: none;
  padding: 1rem 2rem;
  cursor: pointer;
`;
