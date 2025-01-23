import { apiObj } from "@/config/const";

/** Прроверить действие токена авторизации */
export const checkToken = async () =>
  apiObj.get<{ viability: string }>("/user");
