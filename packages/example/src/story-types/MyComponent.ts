import { defineComponent, propType } from '@muban/muban';

export const MyComponent = defineComponent({
  name: 'my-component',
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
    return [];
  },
});
