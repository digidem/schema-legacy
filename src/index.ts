import * as validations from './validations.js'
import {
  SupportedSchemaNames,
  MapeoValue,
  FilterBySchemaName,
} from './types.js'

import {
  type ValidateFunction as AjvValidateFunction,
  type DefinedError,
} from 'ajv'

interface ValidateFunction {
  <TSchemaName extends Extract<keyof typeof validations, SupportedSchemaNames>>(
    schemaName: TSchemaName,
    obj: unknown
  ): obj is FilterBySchemaName<MapeoValue, TSchemaName>
  errors: null | DefinedError[]
}

const validate: ValidateFunction = <
  TSchemaName extends Extract<keyof typeof validations, SupportedSchemaNames>,
>(
  schemaName: TSchemaName,
  obj: unknown
): obj is FilterBySchemaName<MapeoValue, TSchemaName> => {
  const validateSchema = validations[schemaName] as AjvValidateFunction
  const result = validateSchema(obj)
  validate.errors = validateSchema.errors as DefinedError[]
  return result
}
validate.errors = null

export { validate }
