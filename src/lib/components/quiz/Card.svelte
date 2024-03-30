<script lang="ts">
	import _ from 'lodash';

	import type { QuizResult } from '$lib/stores/quiz';
	import { quiz, recordResult } from '$lib/stores/quiz';

	// TODO: there's gotta be a better pattern for this
	const currentQuestion = $derived(quiz!.currentQuestion);
	const [alphagram, words] = $derived(quiz!.questions[quiz!.currentQuestion]);

	let guesses: string[] = $state([]);
	let lastGuess: string | null = $state(null);
	let lastGuessResult: GuessResult | null = $state(null);
	let curGuess = $state('');
	let processedGuess = $derived(curGuess.toUpperCase().trim());

	const correctGuesses: string[] = $state([]);
	const incorrectGuesses: string[] = $state([]);

	enum GuessResult {
		Correct,
		Incorrect,
		Duplicate
		// TODO add invalid guess state which statically evaluates the guess against
		// the search for this quiz
		// Invalid
	}

	function handleGuess() {
		if (guesses.includes(processedGuess)) {
			lastGuessResult = GuessResult.Duplicate;
		} else if (words.includes(processedGuess)) {
			console.log('correct guess');
			correctGuesses.push(processedGuess);
			lastGuessResult = GuessResult.Correct;
		} else {
			console.log('incorrect guess');
			incorrectGuesses.push(processedGuess);
			lastGuessResult = GuessResult.Incorrect;
		}

		lastGuess = processedGuess;
		curGuess = '';
	}

	let gaveUp = $state(false);

	const isFinished = $derived(correctGuesses.length === words.length || gaveUp);
	const wasCorrect = $derived(
		correctGuesses.length === words.length && incorrectGuesses.length === 0
	);

	const result: QuizResult = {
		alphagram: alphagram,
		correct: correctGuesses,
		incorrect: incorrectGuesses,
		missed: words.filter((word) => !correctGuesses.includes(word))
	};
</script>

<h2>{alphagram}</h2>

{#if isFinished}
	{#if wasCorrect}
		<h3>🎉 Nailed It</h3>
	{:else}
		<h3>📚 Review</h3>
	{/if}

	<h3>Words</h3>

	<ul>
		{#each words as word}
			<li>{correctGuesses.includes(word) ? '✅' : '⚠️'} {word}</li>
		{/each}
	</ul>

	{#if incorrectGuesses.length > 0}
		<h4>Incorrect guesses</h4>
		<ul>
			{#each incorrectGuesses as incorrectGuess}
				<li>❌ {incorrectGuess}</li>
			{/each}
		</ul>
	{/if}

	<h4>Words</h4>

	<button on:click={() => recordResult(result)}>Next</button>
	{#if wasCorrect}
		<button on:click={() => recordResult({ ...result, markedMissed: true })}>Mark As Missed</button>
	{:else}
		<button on:click={() => recordResult({ ...result, markedCorrect: true })}
			>Mark As Correct</button
		>
	{/if}
{/if}

{#if !isFinished}
	{#if lastGuessResult === GuessResult.Duplicate}
		<p role="alert" id="duplicate-guess">You already guessed that word!</p>
	{/if}

	{#if lastGuessResult === GuessResult.Incorrect}
		<p role="alert" id="incorrect-guess">{lastGuess} is incorrect</p>
	{/if}

	{#if incorrectGuesses.length > 0}
		<h4>Incorrect guesses</h4>
		<ul>
			{#each incorrectGuesses as incorrectGuess}
				<li>❌ {incorrectGuess}</li>
			{/each}
		</ul>
	{/if}

	{#if correctGuesses.length > 0}
		<h4>Correct guesses</h4>
		<ul>
			{#each correctGuesses as correctGuess}
				<li>✅ {correctGuess}</li>
			{/each}
		</ul>
	{/if}

	<input
		type="text"
		value={processedGuess}
		on:input={(e) => (curGuess = e.currentTarget.value)}
		on:keydown={(e) => e.key === 'Enter' && handleGuess()}
	/>

	<button on:click={() => (gaveUp = true)}>Give Up</button>
{/if}
