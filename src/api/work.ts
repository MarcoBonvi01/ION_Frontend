import apiBase from "./api-base";
import { FILTER_WORKS } from "../constants/end-points";
import type { Work } from "../pages/home/worker/worker-page";

export const fetchWorks = async (
  filter: { [key: string]: string | number },
  currentPage: number,
  pageSize: number,
  sortedBy: { ID: number; name: string },
  sortDirection: "ASC" | "DESC"
): Promise<{ count: number; works: Work[] }> => {
  return apiBase
    .get(
      `${FILTER_WORKS}?offset=${
        currentPage * pageSize
      }&limit=${pageSize}&order_by=${
        sortedBy.name
      }&sort_direction=${sortDirection}`,
      filter
    )
    .then((response) => {
      const data = response.data;

      return {
        count: data.data.count,
        works: data.data.works,
      };
    });
};
