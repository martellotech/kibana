import React, { useState } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n-react';
import { BrowserRouter as Router } from '@kbn/shared-ux-router';
import { EuiButton, EuiHorizontalRule, EuiPageTemplate, EuiTitle, EuiText } from '@elastic/eui';
import type { CoreStart } from '@kbn/core/public';
import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

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
  const [timestamp, setTimestamp] = useState<string | undefined>();

  const onClickHandler = () => {
    setTimestamp(new Date().toISOString());
    notifications.toasts.addSuccess(PLUGIN_NAME);
  };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPageTemplate restrictWidth="1000px">
            <EuiPageTemplate.Header>
              <EuiTitle size="l">
                <h1>
                  <FormattedMessage
                    id="kibanaPendo.helloWorldText"
                    defaultMessage="{name}"
                    values={{ name: PLUGIN_NAME }}
                  />
                </h1>
              </EuiTitle>
            </EuiPageTemplate.Header>
            <EuiPageTemplate.Section>
              <EuiTitle>
                <h2>
                  <FormattedMessage
                    id="kibanaPendo.congratulationsTitle"
                    defaultMessage="Congratulations, you have successfully created a new Kibana Plugin!"
                  />
                </h2>
              </EuiTitle>
              <EuiText>
                <p>
                  <FormattedMessage
                    id="kibanaPendo.content"
                    defaultMessage="Look through the generated code and check out the plugin development documentation."
                  />
                </p>
                <EuiHorizontalRule />
                <p>
                  <FormattedMessage
                    id="kibanaPendo.timestampText"
                    defaultMessage="Last timestamp: {time}"
                    values={{ time: timestamp ? timestamp : 'Unknown' }}
                  />
                </p>
                <EuiButton type="primary" size="s" onClick={onClickHandler}>
                  <FormattedMessage
                    id="kibanaPendo.buttonText"
                    defaultMessage="Click me"
                    ignoreTag
                  />
                </EuiButton>
              </EuiText>
            </EuiPageTemplate.Section>
          </EuiPageTemplate>
        </>
      </I18nProvider>
    </Router>
  );
};
