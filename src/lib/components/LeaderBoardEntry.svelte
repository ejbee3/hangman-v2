<script lang="ts">
  // @ts-ignore
  import type { PageData } from "./$types";
  export let entry: PageData;
  export let total: number;
</script>

<tr class="font-orbitron">
  <th>{total}</th>
  <td>{entry.name}</td>
  <td>{entry.timesSolved}</td>
  <td>{entry.leastGuessesDuringSession}</td>
</tr>
