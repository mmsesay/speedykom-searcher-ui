/* eslint-disable react/display-name */
// withAuth.jsx
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import localForage from "localforage";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    // redirect the user to the dashboard if they are already loggedIn
    useMemo(() => {
      const accessToken = localForage.getItem("tk");

      accessToken
        .then((token) => {
          if (!token) {
            setVerified(false);
            Router.replace("/");
          } else {
            setVerified(true);
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
