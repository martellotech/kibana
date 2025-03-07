/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { FtrProviderContext } from '../../../../../../../ftr_provider_context';

export default ({ loadTestFile }: FtrProviderContext): void => {
  describe('Detection Engine - Execution Logic - keyword family data types', function () {
    loadTestFile(require.resolve('./keyword'));
    loadTestFile(require.resolve('./const_keyword'));
    loadTestFile(require.resolve('./keyword_mixed_with_const'));
  });
};
