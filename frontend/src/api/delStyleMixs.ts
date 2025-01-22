import { apiObj } from "@/config/const";

/** Удаление style mix */
export const deleteStyleMix = async (id_api: number) =>
  apiObj.delete("/image/" + id_api);
