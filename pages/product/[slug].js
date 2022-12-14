import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import Head from "next/head";
import toast from "react-hot-toast";
import Image from "next/image";
import { useEffect } from "react";

export default function ProductDetails() {
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();
  useEffect(() => {
    setQty(1);
  }, []);
  const { query } = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });

  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oops!{error.message}</p>;

  const { title, price, description, image } = data.products.data[0].attributes;
  const notify = () => {
    toast.success(`${qty + " " + title} added to your cart!`, {
      duration: 1500,
    });
  };

  return (
    <>
      <Head>
        <title>Airshop | {title}</title>
        <meta name="description" content="title" />
      </Head>
      <Wrapper>
        <Image
          src={image.data[0].attributes.formats.large.url}
          alt={title}
          width={800}
          height={800}
          objectFit="contain"
        />

        <Description>
          <h2>{title}</h2>
          <h3>${price}</h3>
          <p>{description}</p>
          <Quantity>
            <span>Quantity:</span>
            <button onClick={decreaseQty}>
              <AiFillMinusCircle />
            </button>
            <p>{qty}</p>

            <button>
              <AiFillPlusCircle onClick={increaseQty} />
            </button>
          </Quantity>
          <Button
            onClick={() => {
              onAdd(data.products.data[0].attributes, qty);
              notify();
            }}
          >
            Add to cart
          </Button>
        </Description>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    margin: 1rem 0;
    display: space-between;
  }
  img {
    z-index: -1;
  }
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  margin-left: 2rem;
  @media screen and (max-width: 600px) {
    margin-left: 0;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;

  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
    cursor: pointer;
  }
  p {
    width: 3rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
    marging: 1rem;
    padding-right: 1rem;
  }
`;

const Button = styled.button`
  background: black;
  border: none;
  outline: none;
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
`;
