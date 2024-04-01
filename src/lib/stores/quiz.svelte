<script lang="ts">
	import type { Collection } from '$lib/collections';
	import { SimpleDictionary } from '$lib/dictionary/simple';
	import type { Word } from '$lib/word';
	import _ from 'lodash';

	export type QuizResult = {
		alphagram: string;
		correct: string[];
		incorrect: string[];
		missed: string[];
		markedCorrect?: boolean;
		markedMissed?: boolean;
	};

	type Quiz = {
		currentQuestion: number;
		questions: [string, string[]][];
		results: QuizResult[];
	};

	export let quiz = $state<Quiz | null>(null);

	const dictionary = new SimpleDictionary();

	export function recordResult(result: QuizResult) {
		if (!quiz) throw new Error('Quiz not started');
		quiz.results.push(result);
		quiz.currentQuestion++;
	}

	export function startQuiz(collection: Collection) {
		const search = $derived(dictionary.search(collection.searchSpec));

		const cards: [string, Word[]][] = $derived(_.toPairs(_.groupBy(search, 'alphagram')));

		quiz = {
			currentQuestion: 0,
			questions: cards.map(([alphagram, words]) => [alphagram, words.map((word) => word.word)]),
			results: []
		};
	}
</script>
