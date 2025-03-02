/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { MouseEvent } from 'react';
import React from 'react';
import {
  EuiContextMenuItem,
  EuiButtonIcon,
  EuiToolTip,
  EuiText,
  EuiButtonEmpty,
} from '@elastic/eui';
import { EventsTdContent } from '../../../timelines/components/timeline/styles';
import { DEFAULT_ACTION_BUTTON_WIDTH } from '.';

interface ActionIconItemProps {
  ariaLabel?: string;
  width?: number;
  dataTestSubj?: string;
  content?: string;
  iconType?: string;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  children?: React.ReactNode;
  buttonType?: 'text' | 'icon' | 'emptyButton';
}

const ActionIconItemComponent: React.FC<ActionIconItemProps> = ({
  width = DEFAULT_ACTION_BUTTON_WIDTH,
  dataTestSubj,
  content,
  ariaLabel,
  iconType = '',
  isDisabled = false,
  onClick,
  children,
  buttonType = 'icon',
}) => (
  <>
    {buttonType === 'icon' && (
      <div>
        <EventsTdContent textAlign="center" width={width}>
          {children ?? (
            <EuiToolTip data-test-subj={`${dataTestSubj}-tool-tip`} content={content}>
              <EuiButtonIcon
                aria-label={ariaLabel}
                data-test-subj={`${dataTestSubj}-button`}
                iconType={iconType}
                isDisabled={isDisabled}
                onClick={onClick}
                size="s"
                color="text"
              />
            </EuiToolTip>
          )}
        </EventsTdContent>
      </div>
    )}
    {buttonType === 'text' && (
      <EuiContextMenuItem
        aria-label={ariaLabel}
        data-test-subj={`${dataTestSubj}-button-menu-item`}
        disabled={isDisabled}
        onClick={onClick}
        color="text"
        size="s"
      >
        <EuiText data-test-subj={`${dataTestSubj}-button`} size="m">
          {content}
        </EuiText>
      </EuiContextMenuItem>
    )}
    {buttonType === 'emptyButton' && (
      <EuiButtonEmpty
        onClick={onClick}
        iconType="timeline"
        flush="right"
        size="xs"
        data-test-subj={dataTestSubj}
      >
        {content}
      </EuiButtonEmpty>
    )}
  </>
);

ActionIconItemComponent.displayName = 'ActionIconItemComponent';

export const ActionIconItem = React.memo(ActionIconItemComponent);
