import { type MapeoValue as AllMapeoValues } from './schema/index.js'
export type SupportedSchemaNames = 'observation'

/** Filter a union of objects to only include those that have a prop `schemaName` that matches U */
export type FilterBySchemaName<
  T extends { version: string },
  U extends string,
> = Extract<T, { version: U }>

export type MapeoValue = FilterBySchemaName<
  AllMapeoValues,
  SupportedSchemaNames
>
