<script lang="ts">
  export let onClick: () => void;
  export let disabled: Boolean;
  export let inWord: Boolean;
</script>

<button
  class="btn-sm btn-outline px-4 py-2"
  class:btn-disabled={!inWord && disabled}
  class:btn-correct={inWord}
  on:click={onClick}><slot /></button
>
