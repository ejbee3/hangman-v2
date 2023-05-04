<script lang="ts">
  import Keyboard from "./Keyboard.svelte";
  import { drawManSwitch } from "./DrawHangMan.svelte";
  // @ts-ignore
  let canvas: any;
  export let word: string;
  let lettersGuessed: string[] = [];
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
  $: if (
    word
      .toUpperCase()
      .split("")
      .every((letter) => lettersGuessed.includes(letter))
  ) {
    setTimeout(() => {
      stillPlaying = false;
      won = true;
      wins++;
      lost = false;
    }, 1500);
  }
  function guessLetter(letter: string) {
    if (lettersGuessed.includes(letter.toUpperCase())) {
      return;
    }
    lettersGuessed = [...lettersGuessed, letter];
    if (!word.toUpperCase().includes(letter.toUpperCase())) {
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
          {#each word.toUpperCase() as letter}
            <span class="letter">
              {#if lettersGuessed.includes(letter.toUpperCase())}
                {letter}
              {:else}
                _
              {/if}
            </span>
          {/each}
        </div>
        <Keyboard
          {guessLetter}
          guessedLetters={lettersGuessed}
          word={word.toUpperCase()}
        />
        <div>Strikes {strikes}/{strikesAllowed}</div>
      </div>
    {:else}
      {#if won}
        <div>
          <p>The word was: {word.toUpperCase()}</p>
          <p>Guessed in: {lettersGuessed.length} attempts</p>
          <p>Letters guessed: {lettersGuessed.join(", ").toUpperCase()}</p>
        </div>
      {:else}
        <div>
          <p>The word was: {word.toUpperCase()}</p>
          <p>Letters guessed: {lettersGuessed.join(", ").toUpperCase()}</p>
        </div>
      {/if}
      <div class="mt-4">
        <button class="btn" on:click={() => window.location.reload()}
          >Play again</button
        >
        <a class="btn" href="/leaderboard">Go to leaderboard</a>
      </div>
    {/if}
  </div>
</div>
