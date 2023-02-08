import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useStorybookApi, useStorybookState, useParameter } from '@storybook/api';
import { Source } from '@storybook/addon-docs/blocks';

const ADDON_ID = 'muban-source';
const PANEL_ID = `${ADDON_ID}/panel`;

type SourceType = 'template' | 'script' | 'style' | 'data';

const useSource = (type: SourceType) => {
  const state = useStorybookState();
  const api = useStorybookApi();
  const sourceParam = useParameter('source', {}) as { data: any };
  const data = (state.storyId && api.getParameters(state.storyId)) || {};
  const source = data.component || {};
  return type === 'data' ? JSON.stringify(sourceParam.data || {}, null, 2) : source[type] || '';
};

addons.register(ADDON_ID, (api) => {
  addons.add(`${PANEL_ID}-template`, {
    type: types.PANEL,
    title: 'Template Source',
    render: ({ active, key }) => {
      const source = useSource('template');

      return (
        <AddonPanel active={!!active} key={key}>
          <div style={{ margin: '0 10px' }}>
            {source && <Source language="html" code={source} />}
          </div>
        </AddonPanel>
      );
    },
  });
  addons.add(`${PANEL_ID}-style`, {
    type: types.PANEL,
    title: 'Style Source',
    render: ({ active, key }) => {
      const source = useSource('style');

      return (
        <AddonPanel active={!!active} key={key}>
          <div style={{ margin: '0 10px' }}>
            {source && <Source language="css" code={source} />}
          </div>
        </AddonPanel>
      );
    },
  });
  addons.add(`${PANEL_ID}-script`, {
    type: types.PANEL,
    title: 'Script Source',
    render: ({ active, key }) => {
      const source = useSource('script');

      return (
        <AddonPanel active={!!active} key={key}>
          <div style={{ margin: '0 10px' }}>{source && <Source language="js" code={source} />}</div>
        </AddonPanel>
      );
    },
  });
  addons.add(`${PANEL_ID}-data`, {
    type: types.PANEL,
    title: 'Data Structure',
    render: ({ active, key }) => {
      const source = useSource('data');

      return (
        <AddonPanel active={!!active} key={key}>
          <div style={{ margin: '0 10px' }}>
            {source && <Source language="json" code={source} />}
          </div>
        </AddonPanel>
      );
    },
  });
});
