import { BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SureClose = ({ setToken, setAreYouSure }) => {
  const navigate = useNavigate();

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("login");
    setAreYouSure(false);
  }

  return (
    <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0 z-[1000]">
      <div className=" flex items-center justify-center w-full h-full  ">
        <div className=" bg-white  w-[500px] h-[300px] rounded-lg">
          <div className="flex items-center justify-center h-full space-y-3 flex-col">
            <BiErrorCircle size={49} className="text-gray-600" />
            <h4 className="text-lg font-medium">
              Are you sure you want to Logout ?{" "}
            </h4>

            <div className="flex space-x-6">
              <button
                onClick={logOut}
                className="bg-red-600  duration-200 cursor-pointer hover:bg-red-800 text-white p-2 rounded-lg"
              >
                Yea , I'm Sure
              </button>
              <button
                onClick={() => setAreYouSure(false)}
                className="bg-gray-200 p-2 rounded-lg hover:bg-gray-400 duration-200 cursor-pointer"
              >
                No , cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SureClose;
