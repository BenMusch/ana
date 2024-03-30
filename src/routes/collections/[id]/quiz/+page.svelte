<script lang="ts">
	import _ from 'lodash';
	import type { Word } from '$lib/word.js';
	import { quiz, startQuiz } from '$lib/stores/quiz';
	import Card from '$lib/components/quiz/Card.svelte';

	let { data } = $props();
	let collection = $derived(data.collection);

	$effect(() => startQuiz(collection));
	const isFinished = $derived(quiz && quiz.currentQuestion >= quiz.questions.length);
</script>

{#if quiz}{:else}
	<article aria-busy="true"></article>
{/if}

<h1>{collection.name} Quiz</h1>

{#if isFinished}
	<p>Quiz complete!</p>
	<a href="collections/{collection.id}/quiz">Start again</a>
{:else if quiz}
	<Card />
{:else}
	<p>Quiz loading...</p>
{/if}
