import { SmartGuy } from './smart-guy';

export interface SmartGuyTable {
  data: SmartGuy[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
