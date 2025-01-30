import { apiObj } from "@/config/const";

/** Получить случаные стили */
export const getRandomStyles = async (count: number) =>
  apiObj.get("/styles/" + count);
