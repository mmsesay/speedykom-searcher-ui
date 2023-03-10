import { useState } from "react";
import { useRouter } from "next/router";
import localForage from "localforage";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  search_text: string;
};

const SearchPanel = ({ parentCallback }: any) => {
  const router = useRouter();
  const [formError, setFormError] = useState<string>("");

  // remove the token and redirect to the login page
  const handleLogout = () => {
    const accessToken = localForage.getItem("tk");

    accessToken
      .then((token) => {
        if (token) {
          localForage.removeItem("tk");
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.search_text) {
      const fetchToken = localForage.getItem("tk");

      // get the token from the browser
      fetchToken
        .then((token: any) => {
          // header configs
          let config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          // make post request
          axios
            .get(
              `http://127.0.0.1:5000/api/v1/records/search/${data.search_text}`,
              config
            )
            .then((res: any) => {
              if (res?.data?.status === 200) {
                parentCallback(res?.data?.data?.records);
              }
            })
            .catch((err: any) => {
              if (err?.response?.data?.msg === "Token has expired") {
                setFormError(
                  `${err?.response?.data.msg}. Redirecting to the login page.`
                );
                setTimeout(() => {
                  setFormError("");
                  localForage.removeItem("tk");
                  router.push("/");
                }, 3000);
              }
            });
        })
        .catch((err) => {
          console.log("e: ", err);
        });
    }
  };

  return (
    <>
      <div className="w-2/5">
        <form
          className="relative mb-4 flex w-full flex-wrap items-stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
            placeholder="Enter keyword to search"
            aria-label="Search"
            aria-describedby="button-addon1"
            {...register("search_text", { required: true })}
          />

          <button
            className="relative z-[2] flex items-center rounded-r bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            type="submit"
            id="button-addon1"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </form>
        {errors.search_text && (
          <p className="text-red-500 text-xs italic pt-1 text-center">
            Please enter a keyword to search
          </p>
        )}
        {formError && (
          <p className="text-red-500 text-xs italic my-3 text-center">
            {formError}
          </p>
        )}
      </div>
      <div className="my-2">
        <p
          className="hover:text-blue-500 cursor-pointer"
          onClick={handleLogout}
        >
          logout
        </p>
      </div>
    </>
  );
};

export default SearchPanel;
