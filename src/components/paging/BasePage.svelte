<script lang="ts">
  export let tag = "section"
</script>

<svelte:element
  this={tag}
  class="reader__page {$$props.class ? $$props.class : ''}"
  {...$$restProps}
>
  <slot />
</svelte:element>

<style>
</style>
