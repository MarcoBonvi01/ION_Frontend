export interface Work {
  _id: string;
  success: boolean;
  executed_at: Date;
  terminated_at: Date;

  elements_downloaded: number;
  elements_added: number;
  element_removed: number;
  elements_duplicated: number;
}
