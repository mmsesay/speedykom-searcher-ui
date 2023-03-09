/* eslint-disable react/display-name */
// withAuth.jsx
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import localForage from "localforage";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useMemo(() => {
      const accessToken = localForage.getItem("tk");

      accessToken
        .then((token) => {
          if (!token) {
            setVerified(false);
            Router.replace("/");
          } else {
            setVerified(true);

            // redirect to the dashboard if the user is already loggedIn
            if (Router.pathname == "/") {
              Router.replace("/dashboard");
            }
          }
        })
        .catch((err) => console.log(err));
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
