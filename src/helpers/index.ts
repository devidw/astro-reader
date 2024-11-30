export function getUrlSection() {
  const params = new URLSearchParams(window.location.search)
  const section = params.get("section")
  return section ? parseInt(section) : 0
}

export function setUrlSection(section: number) {
  const params = new URLSearchParams(window.location.search)
  params.set("section", section.toString())
  window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
}

export function getUrlHashSlug() {
  return window.location.hash.slice(1)
}

export function setUrlHashSlug(slug: string) {
  window.location.hash = slug
}

/**
 * Translate a heading slug into a section index
 * Takes the slug and the sections array and returns the index of the section as
 * well as the heading element it corresponds to
 * Each section is an html element which possibly has a heading with the slug as an id
 */
export function getSectionIndexBySlug(slug: string, sections: Readonly<NodeListOf<Element>>): undefined | [number, Element] {
  let out = undefined
  sections.forEach((section, index) => {
    const heading = section.querySelector(`#${slug}`)
    if (heading) {
      out = [index, heading]
    }
  })
  return out
}

/**
 * Get all slugs of a section
 */
export function getSectionSlugs(section: Element): string[] {
  const slugs: string[] = []
  section.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach((heading) => {
    slugs.push(heading.id)
  })
  return slugs
}