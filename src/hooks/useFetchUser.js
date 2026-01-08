import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

 const useFetchUser = () => {
    const dispatch = useDispatch();
    const getUser = async () => {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        // console.log(res.data);
        dispatch(addUser(res.data));
      };
 return getUser;
}
export default useFetchUser;

