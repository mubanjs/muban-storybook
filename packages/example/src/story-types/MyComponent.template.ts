import { html } from '@muban/template';

export type MyComponentTemplateProps = {
  initialValue?: boolean;
  initialValueRequired: boolean;
  data?: any;
  onToggle?(): void;
};

export function myComponentTemplate(
  { initialValue, data, onToggle }: MyComponentTemplateProps,
  ref?: string,
): string {
  return html`
    <div data-component="story" data-initial-value=${String(initialValue)} data-ref=${ref}>
      Working
    </div>
  `;
}
