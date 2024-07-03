import { capitalize } from '../utils.js'

/**
 * @param {Array<{contents:JSON, filePath:string}>} schemaFiles
 */
export default function (schemaFiles) {
  // imports
  const imports = schemaFiles
    .map((schema) => pathToImport(schema.filePath))
    .join('\n')
  // generate union type
  const typeUnion = schemaFiles
    .map((schema) => pathToCapitalizedSchemaName(schema.filePath))
    .join(' | ')
  return `${imports}
export type MapeoValue = ${typeUnion}`
}

/**
 * @param {String} path
 * @returns {String}
 */
function pathToCapitalizedSchemaName(path) {
  const [schemaName, _] = path.split('/')
  return capitalize(schemaName)
}

/**
 * @param {String} path
 * @returns {String}
 */
function pathToImport(path) {
  const [schemaName, file] = path.split('/')
  const [version, _] = file.split('.')
  const capitalizedName = capitalize(schemaName)
  return `import { type ${capitalizedName} } from './${capitalizedName}_${version.replace('v', '')}.js'`
}
