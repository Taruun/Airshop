import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export default function Product({ product }) {
  const { title, price, image, slug } = product.attributes;

  return (
    <Link href={`product/${slug}`}>
      <Details>
        <Image
          src={image.data[0].attributes.formats.medium.url}
          alt={title}
          width="600"
          height="600"
        />
        <h2>{title}</h2>
        <h3>${price}</h3>
      </Details>
    </Link>
  );
}
const Details = styled.div`
  cursor: pointer;
  text-align: center;
  img {
    max-width: 100%;
    max-height: 100%;
    z-index: -1;
  }
`;
