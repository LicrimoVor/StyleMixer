import axios from "axios";

import { apiUrl } from "@/config/const";

export const checkToken = async () => axios.get(apiUrl + "/user");
