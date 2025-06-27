import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

export interface KibanaPendoPluginSetup {}
export interface KibanaPendoPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
