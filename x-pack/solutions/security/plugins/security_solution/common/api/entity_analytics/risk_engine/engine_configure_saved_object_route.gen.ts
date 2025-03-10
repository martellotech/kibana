/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Risk Scoring API
 *   version: 2023-10-31
 */

import { z } from '@kbn/zod';

export type ConfigureRiskEngineSavedObjectErrorResponse = z.infer<
  typeof ConfigureRiskEngineSavedObjectErrorResponse
>;
export const ConfigureRiskEngineSavedObjectErrorResponse = z.object({
  risk_engine_saved_object_configured: z.boolean(),
  errors: z.array(
    z.object({
      seq: z.number().int(),
      error: z.string(),
    })
  ),
});

export type ConfigureRiskEngineSavedObjectRequestBody = z.infer<
  typeof ConfigureRiskEngineSavedObjectRequestBody
>;
export const ConfigureRiskEngineSavedObjectRequestBody = z.object({
  exclude_alert_statuses: z.array(z.string()).optional(),
  range: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
  exclude_alert_tags: z.array(z.string()).optional(),
});
export type ConfigureRiskEngineSavedObjectRequestBodyInput = z.input<
  typeof ConfigureRiskEngineSavedObjectRequestBody
>;

export type ConfigureRiskEngineSavedObjectResponse = z.infer<
  typeof ConfigureRiskEngineSavedObjectResponse
>;
export const ConfigureRiskEngineSavedObjectResponse = z.object({
  risk_engine_saved_object_configured: z.boolean().optional(),
});
