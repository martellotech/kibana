import './index.scss';

import { KibanaPendoPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new KibanaPendoPlugin();
}
export type { KibanaPendoPluginSetup, KibanaPendoPluginStart } from './types';
