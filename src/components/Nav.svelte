<script lang="ts">
  import {
    goToNextSection,
    goToPreviousSection,
    currentSectionIndex,
    sections,
  } from "../stores/readerStore"
</script>

<nav class="grid grid-cols-[1fr_1rem_1fr]">
  <div class="flex justify-end items-center">
    {#if $currentSectionIndex !== 0}
      <button
        on:click={goToPreviousSection}
        class="i-heroicons-solid-chevron-left"
      />
    {/if}
  </div>
  <div class="text-center">{$currentSectionIndex + 1}</div>
  <div class="flex items-center">
    {#if $currentSectionIndex + 1 !== $sections.length}
      <button
        on:click={goToNextSection}
        class="i-heroicons-solid-chevron-right"
      />
    {/if}
  </div>
</nav>
