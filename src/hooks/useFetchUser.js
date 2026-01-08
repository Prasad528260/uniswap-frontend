import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";
 const useFetchUser = () => {
    const dispatch = useDispatch();
    const getUser = async () => {
        try{const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        // console.log(res.data);
        dispatch(addUser(res.data));}
        catch(error){
          console.log(error);
          toast.error(error?.response?.data?.message || "Error fetching user");
        }
      };
 return getUser;
}
export default useFetchUser;

