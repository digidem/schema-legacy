import { compile } from 'json-schema-to-typescript'
import { capitalize } from '../utils.js'

/**
 * @param {Array<{contents:JSON, filePath:string}>} schemaFiles
 * @returns {Promise<Array<{contents:string, filePath:string}>>}
 */
export default async function (schemaFiles) {
  const tsFiles = []
  for (let { contents, filePath } of schemaFiles) {
    tsFiles.push({
      filePath: schemaFileToTsFile(filePath),
      contents: await compile(contents),
    })
  }
  return tsFiles
}

/**
 * @param {String} fullPath
 * @returns {String}
 */
function schemaFileToTsFile(fullPath) {
  const [schemaName, schemaFile] = fullPath.split('/')
  const [version] = schemaFile.split('.').map((v) => v.replace('v', ''))
  return `${capitalize(schemaName)}_${version}.ts`
}
