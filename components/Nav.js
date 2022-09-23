import Link from "next/link";
import { GiShoppingBag } from "react-icons/gi";
import styled from "styled-components";
import Cart from "./Cart";
import User from "./User";
import { useStateContext } from "../lib/context";
const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <NavWrapper>
      <InnerNav>
        <h1>
          <Link href={"/"}>Airshop</Link>
        </h1>
        <Menu>
          <User />
          <ShoppingBag onClick={() => setShowCart(true)}>
            {totalQuantities > 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                {totalQuantities}
              </motion.span>
            )}
            <GiShoppingBag />
          </ShoppingBag>
        </Menu>
        <AnimatePresence> {showCart && <Cart />}</AnimatePresence>
      </InnerNav>
    </NavWrapper>
  );
}
const NavWrapper = styled.nav`
  width: 100vw;
  background: white;
  position: sticky;
  top: 0;
  margin: 0 calc(-50vw + 50%);
  padding: 1rem 2rem;
`;

const InnerNav = styled.div`
  position: relative;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  display: flex;
  svg {
    width: 2rem;
    font-size: 1.5rem;
  }
`;

const ShoppingBag = styled.div`
  position: relative;
  cursor: pointer;
  span {
    background: #ff2626;
    color: white;
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 0.75rem;
    position: absolute;
    right: -10%;
    top: -20%;
    pointer-events: none;
  }
`;
