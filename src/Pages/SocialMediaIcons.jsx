import { AiOutlineTwitter } from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import imageLoading from "../assets/images/Animation - 1734929967700.gif";

const SocialMediaIcons = () => {
  return (
    <div className="flex items-center justify-center flex-col ">
      <h3 className="font-extrabold text-main text-4xl">Follow Us</h3>
      <img src={imageLoading} width={50} alt="LoadingImage" />
      <div className="flex gap-5">
        <FaFacebook
          size={30}
          className="flex items-center cursor-pointer justify-center rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400  hover:text-white duration-300 transition-colors"
        />
        <RiInstagramLine
          size={30}
          className=" flex items-center cursor-pointer justify-center rounded-full bg-slate-300  hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500  hover:text-white duration-300 transition-colors"
        />
        <AiOutlineTwitter
          size={30}
          className="flex items-center cursor-pointer justify-center rounded-full bg-slate-200 hover:bg-black hover:text-white duration-300 transition-colors"
        />
      </div>
    </div>
  );
};

export default SocialMediaIcons;
