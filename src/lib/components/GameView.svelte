<script lang="ts">
  import Keyboard from "./Keyboard.svelte";
  import { drawManSwitch } from "./DrawHangMan.svelte";
  // @ts-ignore
  import type { PageData } from "./$types";

  let canvas: any;

  export let word: string;
  export let player: PageData | Boolean = false;
  let lettersGuessed: string[] = [];
  let leastLettersGuessed: number;

  let stillPlaying = true;
  let strikes = 0;
  const strikesAllowed = 7;
  let won = false;
  let wins: number;
  let lost = false;
  const drawManArr = [
    "stand plus noose",
    "head",
    "body",
    "left leg",
    "right leg",
    "left arm",
    "right arm",
  ];
  // check for lose
  $: if (strikes >= strikesAllowed) {
    setTimeout(() => {
      stillPlaying = false;
      lost = true;
      won = false;
    }, 1500);
  }
  // check for win
  $: if (word.split("").every((letter) => lettersGuessed.includes(letter))) {
    // TODO : add to the wins for returningPlayer
    if (player) {
      wins = player.gamesWon;
    } else {
      wins = Number(sessionStorage.getItem("wins")) || 0;
    }
    wins++;
    sessionStorage.setItem("wins", `${wins}`);

    leastLettersGuessed = Number(sessionStorage.getItem("leastGuesses")) || 27;
    if (leastLettersGuessed > lettersGuessed.length) {
      sessionStorage.setItem("leastGuesses", `${lettersGuessed.length}`);
      leastLettersGuessed = lettersGuessed.length;
    }

    setTimeout(() => {
      stillPlaying = false;
      won = true;
      lost = false;
    }, 1500);
  }
  function guessLetter(letter: string) {
    if (lettersGuessed.includes(letter)) {
      return;
    }
    lettersGuessed = [...lettersGuessed, letter];
    if (!word.includes(letter)) {
      strikes++;
      drawManSwitch(drawManArr[strikes - 1], canvas.getContext("2d"));
    }
  }
</script>

<div>
  <div class="text-3xl">
    {#if stillPlaying}
      <h1>Guess the word</h1>
    {:else if won}
      <h1 class="ml-2">You Win!</h1>
    {:else}
      <h1 class="ml-2">You lose</h1>
    {/if}
  </div>

  <div class="my-6">
    {#if stillPlaying}
      <canvas bind:this={canvas} />
      <div class="flex flex-col items-center w-min">
        <div>
          {#each word as letter}
            <span class="letter">
              {#if lettersGuessed.includes(letter)}
                {letter}
              {:else}
                _
              {/if}
            </span>
          {/each}
        </div>
        <Keyboard {guessLetter} guessedLetters={lettersGuessed} {word} />
        <div>Strikes {strikes}/{strikesAllowed}</div>
      </div>
    {:else}
      {#if won}
        <div>
          <p>The word was: {word}</p>
          <p>Guessed in: {lettersGuessed.length} attempts</p>
          <p>Letters guessed: {lettersGuessed.join(", ")}</p>
        </div>
      {:else}
        <div>
          <p>The word was: {word}</p>
          <p>Letters guessed: {lettersGuessed.join(", ")}</p>
        </div>
      {/if}
      <div class="mt-4">
        <button class="btn" on:click={() => window.location.reload()}
          >Play again</button
        >
        <form method="POST" action="/random?/rankings">
          <input value={wins} name="gamesWon" type="number" hidden />
          <input
            value={leastLettersGuessed}
            name="lowestGuesses"
            type="number"
            hidden
          />
          <button class="btn-dark">Go to leaderboard</button>
        </form>
      </div>
    {/if}
  </div>
</div>
