import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

export interface KibanaPendoPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface KibanaPendoPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
