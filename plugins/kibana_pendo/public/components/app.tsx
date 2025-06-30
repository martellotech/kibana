import React, { useState } from 'react';
import { BrowserRouter as Router } from '@kbn/shared-ux-router';
import type { CoreStart } from '@kbn/core/public';
import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';
import { EuiButton, EuiHorizontalRule, EuiPageTemplate, EuiTitle, EuiText, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { PLUGIN_ID } from '../../common';

interface KibanaPendoAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const KibanaPendoApp = ({
  basename,
  notifications,
  http,
  navigation,
}: KibanaPendoAppDeps) => {
  // Use React hooks to manage state.
  const [init, setInit] = useState<string | undefined>();
  const [enabled, setEnabled] = useState<string | undefined>();
  const [ready, setReady] = useState<string | undefined>();
  const [user, setUser] = useState<string | undefined>();
  const [account, setAccount] = useState<string | undefined>();
  const [apiKey, setApiKey] = useState<string | undefined>();
  const [lastUpdated, setLastUpdated] = useState<string | undefined>();



  const onClickHandler = () => {
    setInit("" + !(typeof window.pendo === 'undefined' || window.pendo === null));
    setEnabled("" + window.pendo.getURL().includes("analyticsEnabled=true"));
    setReady("" + window.pendo?.isReady());
    setUser("" + window.pendo?.visitorId);
    setAccount("" + window.pendo?.accountId)
    setApiKey(window.pendo?.apiKey?.substring(0, 6) + "...");
    setLastUpdated("" + new Date().toISOString());
  };

  const onClickHandlerGetUrl = async () => {
    let url = window.pendo.getURL();
    let permissionStatus = await navigator.permissions.query({ name: 'clipboard-write' as PermissionName });
    if (permissionStatus.state === "granted") {
      navigator.clipboard.writeText(url);
      notifications.toasts.addSuccess("Kibana Url Copied");
    }
    else {
      notifications.toasts.addWarning("Failed to write to clipboard. The url was written to the console instead.");
      console.log(url);
    }
  };

  const onClickHandlerGetDashboardUrl = async () => {
    let dashboardUrl = window.pendo.getURL().replace("kibanaPendo", "dashboards#/view/0b2c74c0-1959-11ed-87c7-5dee0fd0d6d1");
    let permissionStatus = await navigator.permissions.query({ name: 'clipboard-write' as PermissionName });
    if (permissionStatus.state === "granted") {
      navigator.clipboard.writeText(dashboardUrl);
      notifications.toasts.addSuccess("Kibana Url Copied");
    }
    else {
      notifications.toasts.addWarning("Failed to write to clipboard. The url was written to the console instead.");
      console.log(dashboardUrl);
    }
  };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <>
        <navigation.ui.TopNavMenu
          appName={PLUGIN_ID.toLowerCase()}
          showSearchBar={true}
          useDefaultBehaviors={true}
        />
        <EuiPageTemplate restrictWidth="1000px">
          <EuiPageTemplate.Header>
            <EuiTitle size="l">
              <h1>Status of Pendo Plugin</h1>
            </EuiTitle>
          </EuiPageTemplate.Header>
          <EuiPageTemplate.Section>
            <EuiText>
              <p>Initialized: {init}</p>
              <p>Enabled: {enabled}</p>
              <EuiHorizontalRule />
              <p>Ready: {ready}</p>
              <p>Pendo User: {user}</p>
              <p>Pendo Account: {account}</p>
              <p>Api Key: {apiKey}</p>
              <EuiHorizontalRule />
              <p>Updated: {lastUpdated}</p>
              <EuiHorizontalRule />
              <EuiButton size="s" onClick={onClickHandler}>
                Get Status
              </EuiButton>
              <EuiHorizontalRule />
              <EuiFlexGroup>
                <EuiFlexItem grow={false}>
                  <EuiButton size="s" onClick={onClickHandlerGetUrl}>
                    Copy Plugin Url
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton size="s" onClick={onClickHandlerGetDashboardUrl}>
                    Copy Dashboard Url
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiText>
          </EuiPageTemplate.Section>
        </EuiPageTemplate>
      </>
    </Router>
  );
};
