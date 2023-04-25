/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToggle } from '@muban/hooks';
import { bind, defineComponent, propType } from '@muban/muban';
import { html } from '@muban/template';

export const StoryComponent = defineComponent({
  name: 'story',
  props: {
    initialValue: propType.boolean,
    onToggle: propType.func.optional.shape<() => void>(),
    onEnable: propType.func.optional.shape<(value: true) => void>(),
    onDisable: propType.func.optional.shape<(value: false) => void>(),
  },
  refs: {
    label: 'label',
    btnToggle: 'btnToggle',
    btnEnable: 'btnEnable',
    btnDisable: 'btnDisable',
  },
  setup({ props, refs }) {
    const [state, toggle] = useToggle(props.initialValue);
    return [
      bind(refs.label, { text: state }),
      bind(refs.btnToggle, {
        click() {
          toggle();
          props.onToggle?.();
        },
      }),
      bind(refs.btnEnable, {
        click() {
          toggle(true);
          props.onEnable?.(true);
        },
      }),
      bind(refs.btnDisable, {
        click() {
          toggle(false);
          props.onDisable?.(false);
        },
      }),
    ];
  },
});

export function storyTemplate(
  {
    initialValue,
    data,
    onToggle,
    ...rest
  }: { initialValue?: boolean; data?: any; onToggle?(): void },
  ref?: string,
): string {
  return html`
    <div
      data-component="story"
      data-initial-value=${String(initialValue)}
      data-ref=${ref}
      ...${rest}
    >
      <div class="alert alert-primary">
        <h4 class="alert-heading">Instructions!</h4>
        <p class="mb-0">When clicking the buttons, the value should update accordingly.</p>
      </div>
      <div>
        Value:
        <span data-ref="label" class="badge rounded-pill bg-primary"></span>
      </div>
      <div>${data}</div>
      <div style="margin-top: 20px">
        <button type="button" data-ref="btnToggle" class="btn btn-primary" onToggle=${onToggle}>
          Toggle</button
        >${' '}
        <button type="button" data-ref="btnEnable" class="btn btn-success">Enable</button>${' '}
        <button type="button" data-ref="btnDisable" class="btn btn-danger">Disable</button>
      </div>
    </div>
  `;
}
