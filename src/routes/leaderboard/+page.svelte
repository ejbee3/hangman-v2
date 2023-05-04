<script lang="ts">
  import LeaderBoardEntry from "$lib/components/LeaderBoardEntry.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  export let total: number = data.list.total;
</script>

<main>
  <h1>LEADERBOARD</h1>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th># of wins</th>
          <th>Lowest # of guesses</th>
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
