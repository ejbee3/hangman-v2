<script lang="ts">
  import GameView from "$lib/components/GameView.svelte";
  //   import { onMount } from "svelte";

  //   let unusedWordArr: string[] = [];
  //   let usedWordArr: string[] = [];
  let randomWord: string = "";

  async function getRandomWord() {
    const res = await fetch(`/animals.txt`);
    const text = await res.text();

    if (res.ok) {
      const wordArr = text.split(/\s/gm).filter((el) => el.length > 0);
      randomWord = wordArr[Math.floor(Math.random() * 52 + 1)];
      return randomWord;
    } else {
      throw new Error(text);
    }
  }
</script>

{#await getRandomWord() then word}
  <GameView {word} />
{/await}
