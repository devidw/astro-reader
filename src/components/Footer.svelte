<script lang="ts">
  import Nav from "./Nav.svelte"

  enum ScrollStatus {
    Scrolling,
    Stopped,
  }

  let scrollStatus = ScrollStatus.Stopped

  function handleWheelScroll() {
    scrollStatus = ScrollStatus.Scrolling
    setTimeout(() => {
      scrollStatus = ScrollStatus.Stopped
    }, 500)
  }
</script>

<svelte:window on:wheel={handleWheelScroll} />

<footer
  class="h-[20vh] flex justify-center items-center text-(sm gray-4) tracking-wider font-sans transition-300
{$$restProps.class ?? ''}"
>
  <div
    class={scrollStatus === ScrollStatus.Scrolling
      ? "!text-gray-3 animate-swing"
      : ""}
  >
    <Nav />
    <p class="hidden media-touch:block text-xs">
      Swipe horizontally to navigate
    </p>
    <p class="hidden media-mouse:block text-xs">Use arrow keys to navigate</p>
  </div>
</footer>

<style lang="stylus">
  :global(body:not(.js))
    footer
      @apply hidden
</style>
