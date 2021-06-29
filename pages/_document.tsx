import Document, { Head, Html, Main, NextScript } from "next/document";

const description =
  "A demo application that demos editing a site with Tina and Tina Cloud";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={description} />
          <meta property="og:title" content="Tina Cloud" />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content="https://tina.io/img/tina-twitter-share.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
