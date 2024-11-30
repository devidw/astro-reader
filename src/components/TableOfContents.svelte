<script lang="ts">
  // @unocss-include

  import { blur } from "svelte/transition"
  import { getSectionIndexBySlug } from "../helpers"
  import {
    sections,
    currentSectionIndex,
    goToSection,
  } from "../stores/readerStore"

  type astroHeading = {
    depth: number
    slug: string
    text: string
  }
  type readerHeading = astroHeading & {
    index: number
    isDone: boolean
  }

  export let headings: astroHeading[] = []
  let hls: readerHeading[] = []
  let showModal = false

  $: {
    hls = headings
      .filter((heading) => heading.depth <= 2)
      .map((heading) => {
        let index = 0
        if (heading.depth === 2) {
          const res = getSectionIndexBySlug(heading.slug, $sections)
          if (res) {
            index = res[0]
          }
        }
        return {
          ...heading,
          index,
          isDone: $currentSectionIndex >= index,
        }
      })
  }

  function openModal() {
    showModal = true
    document.body.classList.add("overflow-y-hidden")
  }

  function closeModal() {
    showModal = false
    document.body.classList.remove("overflow-y-hidden")
  }

  function toggleModal() {
    if (showModal) {
      closeModal()
    } else {
      openModal()
    }
  }

  function goToSectionByIndex(index: number) {
    goToSection(index)
    closeModal()
  }
</script>

<div
  class="reader__toc__toggle fixed z-1 right-0 h-17 pr-4 flex justify-end
items-center"
>
  <button
    class="text-(2xl gray-5) rounded backdrop-blur cursor-pointer grid"
    title="Table of Contents"
    on:click={toggleModal}
  >
    {#if showModal}
      <div
        class="i-heroicons-solid-x svelte-transition-grid-item"
        transition:blur
      />
    {:else}
      <div
        class="i-heroicons-solid-menu-alt-3 svelte-transition-grid-item"
        transition:blur
      />
    {/if}
  </button>
</div>

{#if showModal}
  <main
    class="fixed w-screen h-screen overflow-y-auto bg-[#101010]"
    transition:blur
  >
    <nav class="max-w-md mx-auto px-4 py-17">
      <ol>
        {#each hls as { text, index, isDone }}
          <li
            class="text-[18px] font-sans tracking-wider cursor-pointer {isDone
              ? 'font-medium text-gray'
              : 'text-gray-5'}"
          >
            <button
              class="block w-full py-3 text-start"
              on:click={() => goToSectionByIndex(index)}
            >
              {text}
            </button>
          </li>
        {/each}
      </ol>
    </nav>
  </main>
{/if}

<style lang="stylus">
  :global(body:not(.js))
    .reader__toc__toggle
      @apply hidden
  
  li + li
    @apply border-t-(1 dark-1)
</style>
