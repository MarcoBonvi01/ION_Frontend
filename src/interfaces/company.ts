export interface Company {
  id: string;
  name: string;
  hq: {
    city: string;
    state: string;
    country: string;
  };
  yoi: number;
  industry: string;
  sector: string;
  region: string;
  assetClass: string;
  createdAt: Date;
  logo_base64: string;
  description: string;
}
