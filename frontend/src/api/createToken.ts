import axios from "axios";

import { apiUrl } from "@/config/const";

export const createToken = async () =>
  axios.post(apiUrl + "/user/reg", undefined, { withCredentials: true });
