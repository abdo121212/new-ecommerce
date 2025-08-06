import { Link } from "react-router-dom";
import favicon from "../assets/images/favicon.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { string } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserProvider";
import { Helmet } from "react-helmet";

const Login = () => {
  const { setToken  } = useContext(UserContext);
  const [loadingBut, setLoadingBut] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    sendDataToLogin(values);
  };

  const validationSchema = Yup.object({
    email: string().email().required(),
    password: string().required(),
  });
  const { errors, getFieldProps, touched, handleSubmit } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  async function sendDataToLogin(values) {
    const loadingClose = toast.loading("Logging in... Please wait.", {
      position: "bottom-right",
    });
    try {
      setLoadingBut(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        toast.success("Login successful! Redirecting to home page...", {
          position: "bottom-right",
        });
        setToken(data.token);

        localStorage.setItem("token", data.token);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoadingBut(false);
    } finally {
      toast.dismiss(loadingClose);
    }
  }

  return (
    <>
      <Helmet>
        <title>Login - Freshcart</title>
        <meta
          name="description"
          content="Login to your Freshcart account to access your shopping cart, wishlist, and order history."
        />
        <meta
          name="keywords"
          content="Login, Freshcart, User Account, Shopping, Online Store"
        />
        <meta property="og:title" content="Login - Freshcart" />
        <meta
          property="og:description"
          content="Login to your Freshcart account to access your shopping cart and more!"
        />
      </Helmet>

      <section className="h-[100vh] w-full flex justify-center items-center -mt-12">
        <div className=" min-h-[500px] w-full sm:w-3/4  shadow-2xl lg:w-1/3 bg-slate-50 p-3 rounded-lg ">
          <div className="flex flex-col space-y-5 items-center justify-center p-2">
            <img src={favicon} alt="" width={100} />
            <h2 className="font-bold  text-xl sm:text-3xl">Welcome Back</h2>
            <p className="font-medium pb-6 text-sm text-slate-400 ">
              Please enter your details
            </p>
            <form
              onSubmit={handleSubmit}
              className="space-y-5  w-full mx-auto  text-xl flex flex-col  items-center justify-center"
            >
              <div className="flex flex-col  items-center justify-center w-full ">
                <input
                  type="email"
                  className="border-b-2  px-3 p-2 w-[90%] outline-0 border-main rounded-b-xl"
                  placeholder="Email"
                  name="email"
                  {...getFieldProps("email")}
                  id="email"
                />
                {touched.email && errors.email ? (
                  <div className="text-red-600">{errors.email}</div>
                ) : null}
              </div>
              <div className="flex flex-col  items-center  w-full ">
                <input
                  type="password"
                  className="border-b-2  px-3 p-2 w-[90%] outline-0 border-main rounded-b-xl"
                  placeholder="password"
                  name="password"
                  id="password"
                  {...getFieldProps("password")}
                />
                {touched.password && errors.password ? (
                  <div className="text-red-600">{errors.password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className={`bg-main w-[70%] px-2 py-2 rounded-lg text-white hover:bg-green-700 duration-150 text-xl`}
              >
                {loadingBut ? <BeatLoader color="#ffff" /> : "Login"}
              </button>
              <h4 className="font-medium">
                if new to fresh cart ?
                <Link to="/signup" className="text-main ml-2 font-semibold">
                  Join now
                </Link>
              </h4>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
