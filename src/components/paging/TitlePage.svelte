<script lang="ts">
  import { currentSectionIndex } from "../../stores/readerStore"
  import BasePage from "./BasePage.svelte"

  export let title: string
  export let caption = ""
</script>

<BasePage tag="header" hidden={$currentSectionIndex !== 0}>
  <div
    class="reader__page__header pt-[5vh] flex flex-col justify-between"
  >
    <header class="text-(center) tracking-wide space-y-20">
      <h1 class="">
        <slot name="title">
          {title}
        </slot>
      </h1>
      {#if caption}
        <p class="text-(gray-500) font-sans">
          <slot name="caption">
            {caption}
          </slot>
        </p>
      {/if}
    </header>
    <div>
      <slot />
    </div>
  </div>
</BasePage>

<style>
  :global(body.js .reader__page__header) {
    height: calc(100vh - 5rem - 20vh);
  }
</style>
