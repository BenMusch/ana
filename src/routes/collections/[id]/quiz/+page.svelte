<script lang="ts">
  import _ from 'lodash';
	import {SimpleDictionary} from '$lib/dictionary/simple';
	import type {Word} from '$lib/word.js';

  let {data} = $props();
  let collection = $derived(data.collection);

  // TODO: this can be a store
  let dictionary = new SimpleDictionary();
  let search = $derived(dictionary.search(collection.searchSpec));

  let cards: [string, Word[]][] = $derived(_.toPairs(_.groupBy(search, 'alphagram')));
  let cardNum = $state(0);

  let alphagram: string | undefined = $state();
  let words: Word[] | undefined = $state();

  $effect(() => {
    [alphagram, words] = cards[cardNum];
  });

  let guesses: string[] = $state([]);
  let curGuess = $state('');
  let processedGuess = $derived(curGuess.toUpperCase().trim());

  function handleGuess() {
    guesses = _.uniq([...guesses, processedGuess]);
    curGuess = '';
  }

  const correctGuesses = $derived(words && guesses.filter(guessedWord => words!.map(({word}) => word).includes(guessedWord)));

  let isFinished = $derived(cardNum >= cards.length);
</script>

<h1>{collection.name} Quiz</h1>

{#if isFinished}
  <p>Quiz complete!</p>
  <a href="collections/{collection.id}/quiz">Start again</a>
{:else if alphagram === undefined}
  <p>No words found for this collection.</p>
{:else}
  <p>Card {cardNum + 1} of {cards.length}</p>
  <h2>{alphagram}</h2>

  {#if correctGuesses.length > 0}
    <p>Correct guesses: {correctGuesses.join(', ')}</p>
  {/if}

  <input type="text" bind:value={curGuess} on:keydown={e => e.key === 'Enter' && handleGuess()} />

  <button on:click={() => cardNum += 1}>Next</button>
{/if}

