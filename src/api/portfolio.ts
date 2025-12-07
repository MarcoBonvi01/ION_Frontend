import apiBase from "./api-base";
import { FILTER_PORTFOLIO, GET_COMPANY } from "../constants/end-points";
import type { Portfolio } from "../interfaces/portfolio";

export const fetchCompany = async (companyId: string): Promise<string> => {
  return apiBase.get(GET_COMPANY + companyId).then((data) => {
    console.log(data);

    return "";
  });
};

export const fetchPortfolio = async (
  currentPage: number,
  pageSize: number,
  sortedBy: { ID: number; name: string },
  sortDirection: "ASC" | "DESC",
  name?: string
): Promise<{ count: number; portfolio: Portfolio }> => {
  const params = new URLSearchParams({
    offset: String(currentPage * pageSize),
    limit: String(pageSize),
    order_by: sortedBy.name,
    sort_direction: sortDirection,
  });

  if (name && name.length > 0) params.set("name", name);

  return apiBase
    .get(`${FILTER_PORTFOLIO}?${params.toString()}`)
    .then((response) => {
      const data = response.data;

      return {
        count: data.data.count,
        portfolio: { companies: data.data.companies },
      };
    });
};
