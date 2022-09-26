import Head from "next/head";
const Head = ({ pageTitle }) => {
  return (
    <Head>
      <title>{`Freesia | ${pageTitle}`}</title>
      <meta name="description" content="Freesia" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Freesia" />
      <meta property="og:description" content="Freesia" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};
