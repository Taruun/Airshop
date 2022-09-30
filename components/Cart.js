import { useStateContext } from "../lib/context";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
const { motion } = require("framer-motion");
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import getStripe from "../lib/getStripe";
import Image from "next/image";

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};
const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
    useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <StyledCart
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Close onClick={() => setShowCart(false)}>
          <AiOutlineClose />
        </Close>

        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1>You have more to do😉</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}

        <CartItems layout variants={cards} initial="hidden" animate="show">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Item key={item.slug} layout variants={card}>
                  <Image
                    src={item.image.data[0].attributes.formats.thumbnail.url}
                    alt={item.image.data[0].attributes.alternativeText}
                    width={110}
                    height={100}
                  />
                  <Description>
                    <h3>{item.title}</h3>
                    <h4>${item.price}</h4>
                    <Quantity>
                      <AiFillMinusCircle onClick={() => onRemove(item)} />
                      <span>{item.quantity}</span>
                      <AiFillPlusCircle onClick={() => onAdd(item, 1)} />
                    </Quantity>
                  </Description>
                </Item>
              );
            })}
        </CartItems>
        {cartItems.length >= 1 && (
          <div>
            <h3>Total: ${totalPrice}</h3>
            <Button onClick={handleCheckout}>Purchase</Button>
          </div>
        )}
      </StyledCart>
    </CartWrapper>
  );
}

const CartWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: hsla(0, 0%, 0%, 0.4);
`;

const StyledCart = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100vh;
  background: white;
  overflow-y: scroll;
  padding: 1rem;
  h2.empty-cart {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
  @media screen and (max-width: 1200px) {
    width: 50%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Close = styled.div`
  text-align: right;
  cursor: pointer;
`;

const CartItems = styled(motion.div)`
  padding: 1rem 0;
`;

const Item = styled(motion.div)`
  display: flex;
  margin: 2rem 0;
  display: flex;
  align-items: center;

  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
  background: white;
  padding: 1.5rem;
  margin: 1.5rem 0rem;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

const Quantity = styled.div`
  margin: 1rem 0;
  span {
    padding: 0.9rem;
  }
  svg {
    cursor: pointer;
  }
`;
const Button = styled.button`
  width: 100%;
  background: black;
  border: none;
  outline: none;
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
  margin-top: 2rem;
`;
const EmptyStyle = styled(motion.div)`
  top: 0;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  h1 {
    font-size: 1.2rem;
    padding: 2rem;
  }
  svg {
    cursor: pointer;
    font-size: 5rem;
    color: var(--secondary);
  }
`;
