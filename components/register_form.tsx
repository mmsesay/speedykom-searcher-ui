import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = ({ parentCallback }: any) => {
  const [formError, setFormError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // submit function
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      if (data.password != data.confirmPassword) {
        setFormError("Password donot match");
      } else {
        setFormError(""); // clear the form error

        // make post request
        axios
          .post("http://127.0.0.1:5000/api/v1/register", data)
          .then((res: any) => {
            if (res?.data?.status != "fail") {
              parentCallback(0, res?.data?.message); // show the login page after registeration
            } else {
              setFormError(res?.data?.message);
            }
          })
          .catch((err: any) => {
            console.log(err);
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
      <h2 className="text-center py-3 text-lg">Health Searcher - Register</h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formError && (
          <p className="text-red-500 text-xs italic py-3 text-center">
            {formError}
          </p>
        )}

        {/* email field */}
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

        {/* password field */}
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

        {/* confirm password field */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              Please confirm your password.
            </p>
          )}
        </div>

        {/* buttons */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => handleButtonSwitch(1)}
          >
            Sign up
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
            onClick={() => handleButtonSwitch(0)}
          >
            Sign In
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Health Searcher App. All rights reserved.
      </p>
    </div>
  );
};

export default RegisterForm;
