<script lang="ts">
  export let onClick;
  export let disabled;
  export let inWord;
  function disable() {
    disabled = true;
  }
</script>

<button
  class="btn-sm btn-outline"
  class:btn-disabled={disabled}
  class:btn-error={!inWord && disabled}
  class:btn-success={inWord && disabled}
  on:click={onClick}><slot /></button
>
