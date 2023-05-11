<script lang="ts">
  import LeaderBoardEntry from "$lib/components/LeaderBoardEntry.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  let total: number = data.list.total;
</script>

<main>
  <h1>LEADERBOARD</h1>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" />
          <th scope="col">Name</th>
          <th scope="col"># of wins</th>
          <th scope="col">Lowest # of guesses</th>
        </tr>
      </thead>
      <tbody>
        {#each data.list.playerProfile as entry (entry.id)}
          <LeaderBoardEntry {entry} {total} />
        {/each}
      </tbody>
    </table>
  </div>
</main>
