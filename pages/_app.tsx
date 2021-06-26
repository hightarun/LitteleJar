// this function gets called on every page render on server side and also client side

import type { AppProps } from "next/app";
import Head from "next/head";

import "./globals.scss";

//redux
import { useStore } from "../redux/store";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,height=device-height, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="icon" href="/jarFavicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Crimson+Text|Work+Sans:400,700"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
