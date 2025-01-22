import { apiObj } from "@/config/const";

/** Получить токен авторизации */
export const createToken = async () => apiObj.post("/user/reg");
