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
      <div>
        <div class="alert alert-primary">
          <h4 class="alert-heading">Instructions!</h4>
          <p class="mb-0">Just testing the TS types for creating stories, nothing to see here.</p>
        </div>
      </div>
    </div>
  `;
}
