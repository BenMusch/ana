import type { SearchSpec } from './search';

/**
 * A collection is the wrapper around a search for words. Users can name them
 * and add a description
 */
export type Collection = {
	/**
	 * Unique document ID
	 */
	id: string;
	/**
	 * Top-level name of the collection displayed in the UI
	 */
	name: string;
	searchSpec: SearchSpec;
};

/**
 * TODOs to get full cheat sheet working
 * - Length queries
 * - Consists of queries
 */
export const CHEAT_SHEET_NWL23 = [
	{
		id: '1',
		name: '2-Letter Words',
		searchSpec: {
			alphagram: '??'
		}
	},
	{
		id: '2',
		name: '3-Letter Words',
		searchSpec: {
			alphagram: '???'
		}
	},
	{
		id: '5',
		name: 'SATINE? Bingos',
		searchSpec: {
			alphagram: 'AEINST?'
		}
	},
	{
		id: '8',
		name: 'RETINA? Bingos',
		searchSpec: {
			alphagram: 'AEINRT?'
		}
	},
	{
		id: '7',
		name: 'SATIRE? Bingos',
		searchSpec: {
			alphagram: 'AEINRT?'
		}
	}
];
