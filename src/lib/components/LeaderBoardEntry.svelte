<script lang="ts">
  // @ts-ignore
  import type { PageData } from "./$types";
  export let entry: PageData;
  export let total: number;
</script>

<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
  <th
    scope="row"
    class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >{total}</th
  >
  <td>{entry.name}</td>
  <td>{entry.gamesWon}</td>
  <td>{entry.lowestGuesses}</td>
</tr>
