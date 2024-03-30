<script lang="ts">
  import { CHEAT_SHEET_NWL23 } from '$lib/collections';
</script>

<h1>Collections</h1>

<div class="collections-list">
  {#each CHEAT_SHEET_NWL23 as collection}
    <article>
      <h3>{collection.name}</h3>
      <a href="collections/{collection.id}/quiz">Start Anagram Quiz</a>
    </article>
  {/each}
</div>
