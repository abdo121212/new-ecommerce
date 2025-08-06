import { useFormik } from "formik";
import favicon from "../assets/images/favicon.png";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
const SignUp = () => {
  const [loadingBut, setLoadingBut] = useState(false);
  const passwordRe = /^[a-zA-Z0-9!@#$%^&*]{6,20}$/;
  const emailRe = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const phoneRe = /^(02)?01[0125][0-9]{8}/;
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setLoadingBut(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (data.message === "success") {
        toast.success("Register successful! Redirecting to login page...", {
          position: "bottom-right",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
      });
      setLoadingBut(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("* Name is required.")
      .min(3, "* Minimum 3 characters.")
      .max(20, "* Maximum 20 characters."),
    email: Yup.string()
      .required("* Email is required.")
      .matches(emailRe, "* Invalid email address."),
    password: Yup.string()
      .required("* Password is required.")
      .matches(passwordRe, "* Invalid password format."),
    rePassword: Yup.string()
      .required("* Please confirm your password.")
      .oneOf([Yup.ref("password")], "* Passwords must match."),
    phone: Yup.string()
      .required("* Phone number is required.")
      .matches(phoneRe, "* Invalid phone number."),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const { errors, getFieldProps, touched, handleSubmit } = useFormik({
    onSubmit,
    validationSchema,
    initialValues,
  });
  return (
    <section className="h-[100vh] w-full flex justify-center items-center -mt-10">
      <div className=" min-h-[500px] w-full sm:w-3/4  shadow-2xl lg:w-1/3 bg-slate-50 p-2 rounded-lg ">
        <div className="flex flex-col space-y-1 items-center justify-center p-2">
          <img src={favicon} alt="" width={100} />
          <h2 className="font-bold  text-xl sm:text-xl">Get Started</h2>
          <p className="font-medium pb-6 text-sm text-slate-400 ">
            Welcome to FreshCart - let's create your account
          </p>
          <form onSubmit={handleSubmit} className="w-full mx-auto text-xl">
            <div className="flex flex-col  items-center justify-center  space-y-4">
              <div className="flex items-center justify-center flex-col w-full">
                <input
                  type="text"
                  className="border-b-2  px-3 p-2 w-[90%] outline-0 border-main rounded-b-xl "
                  placeholder="name"
                  {...getFieldProps("name")}
                  name="name"
                />
                {errors.name && touched.name ? (
                  <div className="text-red-600 text-sm">{errors.name}</div>
                ) : null}
              </div>

              <div className="flex items-center justify-center flex-col w-full">
                <input
                  type="email"
                  {...getFieldProps("email")}
                  className="border-b-2  px-3 p-2 w-[90%] outline-0 border-main rounded-b-xl"
                  placeholder="Email"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-600 text-sm">{errors.email}</div>
                ) : null}
              </div>

              <div className="flex items-center justify-center flex-col w-full">
                <input
                  type="password"
                  {...getFieldProps("password")}
                  className="border-b-2  px-3 p-2 w-[90%] outline-0 border-main rounded-b-xl"
                  placeholder="password"
                  name="password"
                />

                {errors.password && touched.password ? (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                ) : null}
              </div>
              <div className="flex items-center justify-center flex-col w-full">
                <input
                  {...getFieldProps("rePassword")}
                  type="password"
                  className="border-b-2  px-3 p-2 w-[90%] outline-0 border-main rounded-b-xl"
                  placeholder="confirm Password"
                  name="rePassword"
                />
                {errors.rePassword && touched.rePassword ? (
                  <div className="text-red-600 text-sm">
                    {errors.rePassword}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-center flex-col w-full">
                <input
                  type="text"
                  {...getFieldProps("phone")}
                  className="border-b-2  px-3 p-2 w-[90%] outline-0 border-main rounded-b-xl"
                  placeholder="phone"
                  name="phone"
                />
                {touched.phone && errors.phone ? (
                  <div className="text-red-600 text-sm">{errors.phone}</div>
                ) : null}
              </div>
            </div>

            <div className=" flex items-center  flex-col space-y-4 mt-5">
              <button
                type="submit"
                className={`bg-main w-[70%] px-2 py-2 rounded-lg text-white hover:bg-green-700 duration-150`}
              >
                {loadingBut ? <BeatLoader color="#ffff" /> : "Login"}
              </button>

              <h4>
                Already on Fresh Cart ?
                <Link to="/login" className="text-main ml-2">
                  Log in
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
