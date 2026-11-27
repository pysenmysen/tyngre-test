// This project's entry for the GrebFig preview (preview/): each Figma set (as named in design/specs.json) mapped to
// its component. The preview draws the set's showcase (states, modes, variants, behaviour, switches) and asks for one
// Cell at a time; Hover, Pressed, Focus and Focus visible are its own. Texts are Figma's ("Label", "Buy").
// Add an entry when a component is built:
//   'Button/Primary/Md': { page: 'Buttons', render: (c) => <ButtonPrimary size="md" disabled={c.state === 'Disabled'} /> },
import type { PreviewConfig } from '../preview/types'

export const config: PreviewConfig = {
  stage: 'bg-ui-background-default text-ui-content-primary',
  sets: {},
}
