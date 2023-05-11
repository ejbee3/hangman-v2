<script lang="ts">
  import GameView from "$lib/components/GameView.svelte";
  // @ts-ignore
  import type { PageData } from "./$types";

  let randomWord: string = "";
  export let data: PageData;

  async function getRandomWord() {
    const res = await fetch(`/animals.txt`);
    const text = await res.text();

    if (res.ok) {
      const wordArr = text.split(/\s/gm).filter((el) => el.length > 0);
      randomWord =
        wordArr[Math.floor(Math.random() * wordArr.length + 1)].toUpperCase();
      return randomWord;
    } else {
      throw new Error(text);
    }
  }
</script>

{#await getRandomWord() then word}
  <main>
    {#each data.player as p (p.id)}
      <GameView {word} player={p} />
    {/each}
  </main>
{/await}
