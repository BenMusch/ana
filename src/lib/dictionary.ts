import type { SearchSpec } from './search';
import type { Word } from './word';

export interface Dictionary {
	search(SearchSpec: SearchSpec): Word[];
}
