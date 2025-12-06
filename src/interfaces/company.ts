export interface Company {
  id: string;
  name: string;
  hq: string;
  yoi: number;
  industry: string;
  sector: string;
  region: string;
  assetClass: string;
  createdAt: Date;
  logo_bytes: Uint8Array;
  description: string;
}