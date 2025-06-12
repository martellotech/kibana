import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface KibanaPendoPluginSetup {}
export interface KibanaPendoPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
