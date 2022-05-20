import Cookies from "js-cookie";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
const withAuth = (WrappedComponent: NextComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      // If there is no access token we redirect to "/" page.
      if (Cookies.get("token") === undefined) {
        Router.replace("/auth/signin");
        return null;
      }

      return <WrappedComponent {...props} />; 
      // If this is an accessToken we just render the component that was passed with all its props
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
