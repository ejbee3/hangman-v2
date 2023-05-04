<script lang="ts">
  import KeyboardButton from "./KeyboardButton.svelte";
  type playerGuess = (l: string) => void;
  export let guessLetter: playerGuess;
  export let guessedLetters: string[] = [];
  export let word: string;
</script>

<div class="w-min">
  {#each ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"] as row}
    <div class="flex justify-center">
      {#each row.split("") as letter}
        <KeyboardButton
          disabled={guessedLetters.includes(letter.toUpperCase())}
          inWord={word.includes(letter)}
          onClick={() => guessLetter(letter)}>{letter}</KeyboardButton
        >
      {/each}
    </div>
  {/each}
</div>
