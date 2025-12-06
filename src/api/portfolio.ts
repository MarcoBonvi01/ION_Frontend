import apiBase from "./api-base";
import type { Portfolio } from "../pages/home/portfolio/portfolio-page";
import { FILTER_PORTFOLIO, GET_COMPANY } from "../constants/end-points";

export const fetchCompany = async (companyId: string): Promise<string> => {
  return apiBase.get(GET_COMPANY + companyId).then((data) => {
    console.log(data);

    return "";
  });
};

export const fetchPortfolio = async (
  filter: { [key: string]: string | number },
  currentPage: number,
  pageSize: number,
  sortedBy: { ID: number; name: string },
  sortDirection: "ASC" | "DESC"
): Promise<{ count: number; portfolio: Portfolio }> => {
  return apiBase
    .get(
      `${FILTER_PORTFOLIO}?offset=${
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
        portfolio: { companies: data.data.companies },
      };
    });
};
