/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type {
  ControlGroupRendererApi,
  ControlGroupRuntimeState,
  DataControlApi,
} from '@kbn/controls-plugin/public';
import { ControlGroupRenderer } from '@kbn/controls-plugin/public';
import type { DataView } from '@kbn/data-views-plugin/public';
import type { Filter, Query, TimeRange } from '@kbn/es-query';
import styled from '@emotion/styled';
import { useControlPanels } from '@kbn/observability-shared-plugin/public';
import React, { useCallback, useEffect, useRef } from 'react';
import { Subscription } from 'rxjs';
import { controlPanelConfigs } from './control_panels_config';
import { ControlTitle } from './controls_title';

interface Props {
  dataView: DataView | undefined;
  timeRange: TimeRange;
  filters: Filter[];
  query: Query;
  onFiltersChange: (filters: Filter[]) => void;
}

export const ControlsContent: React.FC<Props> = ({
  dataView,
  filters,
  query,
  timeRange,
  onFiltersChange,
}) => {
  const [controlPanels, setControlPanels] = useControlPanels(controlPanelConfigs, dataView);
  const subscriptions = useRef<Subscription>(new Subscription());

  const getInitialInput = useCallback(
    () => async () => {
      const initialInput: Partial<ControlGroupRuntimeState> = {
        chainingSystem: 'HIERARCHICAL',
        labelPosition: 'oneLine',
        initialChildControlState: controlPanels,
      };

      return { initialState: initialInput };
    },
    [controlPanels]
  );

  const loadCompleteHandler = useCallback(
    (controlGroup: ControlGroupRendererApi) => {
      if (!controlGroup) return;

      controlGroup.untilInitialized().then(() => {
        const children = controlGroup.children$.getValue();
        Object.keys(children).map((childId) => {
          const child = children[childId] as DataControlApi;
          child.CustomPrependComponent = () => (
            <ControlTitle title={child.title$.getValue()} embeddableId={childId} />
          );
        });
      });

      subscriptions.current.add(
        controlGroup.filters$.subscribe((newFilters = []) => {
          onFiltersChange(newFilters);
        })
      );

      subscriptions.current.add(
        controlGroup
          .getInput$()
          .subscribe(({ initialChildControlState }) => setControlPanels(initialChildControlState))
      );
    },
    [onFiltersChange, setControlPanels]
  );

  useEffect(() => {
    const currentSubscriptions = subscriptions.current;
    return () => {
      currentSubscriptions.unsubscribe();
    };
  }, []);

  if (!dataView) {
    return null;
  }

  return (
    <ControlGroupContainer>
      <ControlGroupRenderer
        getCreationOptions={getInitialInput()}
        onApiAvailable={loadCompleteHandler}
        timeRange={timeRange}
        query={query}
        filters={filters}
      />
    </ControlGroupContainer>
  );
};

const ControlGroupContainer = styled.div`
  .controlGroup {
    min-height: ${(props) => props.theme.euiTheme.size.xxl};
  }
`;
