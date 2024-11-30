import { atom, action, computed, type WritableAtom } from "nanostores"

export const sections: WritableAtom<NodeListOf<Element>> = atom([])

export const currentSectionIndex: WritableAtom<number> = atom(0)

export const currentSection = computed(
  [sections, currentSectionIndex],
  (sections, currentSectionIndex) => sections[currentSectionIndex]
)

export const goToSection = action(
  currentSectionIndex,
  "goToSection",
  (store, index: number) => {
    store.set(index)
    window.scroll(0, 0, { behavior: "smooth" })
  }
)

export const goToNextSection = action(
  currentSectionIndex,
  "goToNextSection",
  (store) => {
    const newIndex = store.get() + 1
    const maxIndex = sections.get().length - 1
    // console.log({
    //   newIndex,
    //   maxIndex,
    // })
    if (newIndex > maxIndex) {
      goToSection(0)
    } else {
      goToSection(newIndex)
    }
  }
)

export const goToPreviousSection = action(
  currentSectionIndex,
  "goToPreviousSection",
  (store) => {
    const newIndex = store.get() - 1
    const maxIndex = sections.get().length - 1
    if (newIndex < 0) {
      goToSection(maxIndex)
    } else {
      goToSection(newIndex)
    }
  }
)
