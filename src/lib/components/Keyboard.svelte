<script>
  import KeyboardButton from "./KeyboardButton.svelte";
  export let guessLetter;
  export let guessedLetters = [];
  export let word;
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
