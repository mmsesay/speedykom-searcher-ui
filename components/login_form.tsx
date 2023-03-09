import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import localForage from "localforage";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = ({ parentCallback }: any) => {
  const router = useRouter();
  const [formError, setFormError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      if (data) {
        // make post request
        axios
          .post("http://127.0.0.1:5000/api/v1/login", data)
          .then((res: any) => {
            if (res?.data.status === "success") {
              localForage.setItem("tk", res?.data.auth_token);
              router.push("/dashboard"); // redirect to the dashboard after successful login
            }
          })
          .catch((err: any) => {
            setFormError(err?.response?.data.message);
            setTimeout(() => {
              setFormError("");
            }, 3000);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonSwitch = (value: number) => {
    parentCallback(value);
  };

  return (
    <div className="w-full max-w-xs ">
      <h2 className="text-center py-3 text-lg">Health Searcher</h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formError && (
          <p className="text-red-500 text-xs italic py-3 text-center">
            {formError}
          </p>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              Please enter your email.
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              Please enter your password.
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => handleButtonSwitch(0)}
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
            onClick={() => handleButtonSwitch(1)}
          >
            Create Account
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Health Searcher App. All rights reserved.
      </p>
    </div>
  );
};

export default LoginForm;
