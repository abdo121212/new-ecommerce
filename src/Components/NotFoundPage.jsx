import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className=" h-screen  bg-main/15 ">
      <div className="flex items-center justify-center h-full flex-col space-y-10">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-7xl bg-gradient-to-r   from-yellow-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Page Not Found{" "}
        </h2>
        <div className=" py-2 px-3 rounded-2xl flex items-center  justify-center space-x-2  bg-gradient-to-r   from-yellow-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          <BiArrowBack className="animate-pulse text-main/30 " size={30} />

          <Link
            to={"/"}
            className=" text-4xl  bg-gradient-to-r   from-main via-red-500 to-main bg-clip-text text-transparent"
          >
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
