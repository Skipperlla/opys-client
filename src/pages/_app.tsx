import "react-toastify/dist/ReactToastify.css";
import "@assets/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import store from "@store/store";
import { Provider, useDispatch } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import ToasterContainer from "@components/ToasterContainer";
import Main from "Layouts/Main";
import Cookies from "js-cookie";
import { UserAction } from "@store/actions/index";
import api from "@utils/lib/api";
import { Error } from "@utils/lib/messages";
import * as rdd from "react-device-detect";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    setIsSSR(typeof window === "undefined");
  }, []);
  const updateUser = async (subscribe: any) => {
    try {
      await api.put("/User/Update/User", { subscribe });
    } catch (e: any) {
      const { status, data } = e.response;
      Error(data.message);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("token") && router.isReady) {
      if (!rdd.isMobile) {
        if (Notification?.permission === "granted") {
          window.addEventListener("load", async () => {
            await navigator.serviceWorker.register("/sw.js");
            const serviceWorker = await navigator.serviceWorker.ready;
            const clientID = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: process.env.WEB_PUSH_PUBLIC_KEY,
            });
            updateUser(clientID);
          });
        } else {
          updateUser(null);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (Cookies.get("token")) {
      dispatch(UserAction.isLoggedIn());
    }
  }, []);

  return (
    <Provider store={store}>
      <Main>
        {!isSSR && <Component {...pageProps} />}
        <ToasterContainer />
      </Main>
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);
