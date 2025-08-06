import amazonPay from "../assets/images/amazon-pay.png";
import masterCard from "../assets/images/mastercard.webp";
import payPal from "../assets/images/paypal.png";
import americanExpress from "../assets/images/American-Express-Color.png";
import getGooglePlay from "../assets/images/get-google-play.png";
import getAppleStore from "../assets/images/get-apple-store.png";
import SocialMediaIcons from "../Pages/SocialMediaIcons";

const PaymentMethods = [
  { id: 1, url: amazonPay },
  { id: 2, url: masterCard },
  { id: 3, url: payPal },
  { id: 4, url: americanExpress },
];
const Footer = () => {
  return (
    <footer className="py-8 shadow-md  bg-gray-100">
      <div className="container  mx-auto px-20 space-y-5">
        <div className="py-4 flex flex-col space-y-5">
          <div className="flex flex-col space-y-3">
            <h3 className="text-xl">Get the FreshCart app</h3>
            <h4 className="text-slate-400">
              <span className="w-full bg-black h-3"></span>
              We will send you a link, open it on Your phone to download the
              app.
            </h4>
          </div>
          <div className="w-full flex flex-row  gap-5  items-center justify-between ">
            <input
              type="email"
              placeholder="Email"
              className=" flex-3 border-2 py-2 rounded-2xl px-6 outline-main border-main"
            />
            <button className="bg-main px-2 flex-1 max-sm:hidden  sm:py-2 py-1 rounded-lg text-white  hover:bg-green-700 duration-150  sm:text-lg text-[10px] w-full">
              Share App Link
            </button>
          </div>

          <div className="bg-gray-600/65 w-full h-[3px] rounded-3xl"></div>

          <div className="flex justify-between items-center px-1 mt-7 flex-col sm:flex-row  space-y-6 ">
            <div className="flex  items-center gap-4">
              <h4>payment methods</h4>

              <div className="flex space-x-2">
                {PaymentMethods.map(({ id, url }) => (
                  <img
                    key={id}
                    src={url}
                    alt="PaymentMethod"
                    className="object-contain"
                    loading="lazy"
                    width={35}
                  />
                ))}
              </div>
            </div>

            <div className="flex  items-center gap-4 flex-col justify-center">
              <h4 className="text-center">Get deliveries with FreshCart</h4>

              <div className="flex space-x-2">
                <img
                  src={getGooglePlay}
                  alt="PaymentMethods"
                  className="object-cover "
                  width={100}
                />
                <img
                  src={getAppleStore}
                  alt="PaymentMethods"
                  width={100}
                  className="object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SocialMediaIcons />
    </footer>
  );
};

export default Footer;
