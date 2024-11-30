<script lang="ts">
  import { onMount, tick } from "svelte"
  import {
    sections,
    currentSectionIndex,
    goToSection,
    goToNextSection,
    goToPreviousSection,
  } from "../stores/readerStore"
  import {
    getUrlHashSlug,
    getSectionIndexBySlug,
    getSectionSlugs,
  } from "../helpers"
  import "../styles/index.styl"
  import Footer from "./Footer.svelte"

  export let showFooter = true

  let root: HTMLElement
  let touchStartX = 0
  let touchEndX = 0

  function onTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].screenX
  }

  // https://stackoverflow.com/a/56663695/13765033
  function onTouchEnd(e: TouchEvent) {
    touchEndX = e.changedTouches[0].screenX
    const distance = touchStartX - touchEndX
    // console.table({ touchStartX, touchEndX, distance })
    if (distance > 100) {
      goToNextSection()
    } else if (distance < -100) {
      goToPreviousSection()
    }
    touchStartX = 0
    touchEndX = 0
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      goToNextSection()
    } else if (e.key === "ArrowLeft") {
      goToPreviousSection()
    }
  }

  async function maybeChangeSectionOnSlug() {
    const slug = getUrlHashSlug()
    if (slug) {
      const res = getSectionIndexBySlug(slug, $sections)
      if (res) {
        const [index, section] = res
        goToSection(index)
        // await tick()
        // section.scrollIntoView()
      }
    }
  }

  function onHashChange() {
    // console.log("hashchange")
    maybeChangeSectionOnSlug()
  }

  /**
   * On scoll when an h2 heading is scrolled the hash updated to the id of the
   * given headline without reloading the page.
   */
  function onScroll() {
    const h2s = root.querySelectorAll("h2")
    Array.from(h2s).forEach((h2) => {
      const { top, bottom } = h2.getBoundingClientRect()
      if (top < 0 && bottom > 0) {
        history.replaceState(null, "", `#${h2.id}`)
      }
    })
  }

  onMount(() => {
    const content = root.querySelector("astro-slot[name=content]")
    if (!content) return
    content.innerHTML = content?.innerHTML
      .split("<hr>")
      .map((section) => {
        return `<section class="reader__page">${section}</section>`
      })
      .join("")

    $sections = document.querySelectorAll(".reader__page")
    // console.log($sections)

    // Has to be called after the sections are set
    maybeChangeSectionOnSlug()

    // We initially load the page invisible to prevent a flash of unstyled and
    // jumping of the scrollbar
    document.body.classList.remove("invisible")
  })

  // on display of sections
  $: {
    if ($sections[$currentSectionIndex]) {
      // console.log($currentSectionIndex)

      // Hide previous section
      $sections.forEach((section) => {
        if (section.getAttribute("hidden") === null) {
          section.setAttribute("hidden", "")
        }
      })

      // Show current section
      $sections[$currentSectionIndex].removeAttribute("hidden")

      // Update the hash with the first heading of the current section
      const slug = getUrlHashSlug()
      const sectionSlugs = getSectionSlugs($sections[$currentSectionIndex])

      if (!slug || !sectionSlugs.includes(slug)) {
        history.replaceState(
          null,
          "",
          sectionSlugs[0] ? `#${sectionSlugs[0]}` : " "
        )
      }
    }
  }
</script>

<svelte:window
  on:keydown={onKeyDown}
  on:hashchange={onHashChange}
  on:scroll={onScroll}
/>

<article
  bind:this={root}
  on:touchstart|passive={onTouchStart}
  on:touchend|passive={onTouchEnd}
  class="reader"
>
  <slot name="title" />
  <slot name="content" />
</article>

{#if showFooter}
  <Footer />
{/if}
