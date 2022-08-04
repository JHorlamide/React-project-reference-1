import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Provider } from "react-redux";
import store, { persistor } from "../store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import AppLoader from "@/components/AppLoader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<AppLoader />} persistor={persistor}> */}
      <ChakraProvider theme={theme}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <Component {...pageProps} />
      </ChakraProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default MyApp;
