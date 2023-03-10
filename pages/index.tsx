import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { LoginForm, RegisterForm } from "@/components";
import localForage from "localforage";

export default function Index() {
  const router = useRouter();
  const [formView, setFormView] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleChildData = (value: number, message: string = "") => {
    setFormView(value);
    if (message != undefined) {
      setMessage(message);
      setTimeout(() => {
        setMessage(""); // clear the message after 3 seconds
      }, 3000);
    }
  };

  useMemo(() => {
    const accessToken = localForage.getItem("tk");

    accessToken
      .then((token) => {
        if (token) {
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Searcher UI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
          {message && message}
          {formView === 0 ? (
            <LoginForm parentCallback={handleChildData} />
          ) : (
            <RegisterForm parentCallback={handleChildData} />
          )}
        </div>
      </main>
    </>
  );
}
