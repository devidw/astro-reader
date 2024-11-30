<script lang="ts">
  import Reader from "../components/Reader.svelte"
  import TableOfContents from "../components/TableOfContents.svelte"
  import { TitlePage } from ".."

  export let props: Astro["props"]
  export let frontmatter: Astro["props"]["frontmatter"]

  if (!frontmatter) {
    frontmatter = props
  }

  // $: console.log(props)

  const showToc = props.headings && props.headings.length > 0

  const showTitlePage = frontmatter.reader?.hasOwnProperty("showTitlePage")
    ? frontmatter.reader.showTitlePage
    : true

  const showFooter = frontmatter.reader?.hasOwnProperty("showFooter")
    ? frontmatter.reader.showFooter
    : true
</script>

{#if showToc}
  <TableOfContents headings={props.headings} />
{/if}

<Reader {showFooter}>
  <svelte:fragment slot="title">
    {#if showTitlePage}
      <TitlePage title={frontmatter.title ?? ""} />
    {:else}
      <h1 class="sr-only">{frontmatter.title ?? ""}</h1>
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="content">
    <slot name="content" />
  </svelte:fragment>
</Reader>
