import fs from 'node:fs/promises'
import { resolve } from 'node:path'
import readSchemaFiles from './lib/readSchemaFiles.js'
import generateTypes from './lib/generateTypes.js'
import generateValidations from './lib/generateValidations.js'

const schemasRoot = 'schema/'
const outRoot = 'generated'

await fs.mkdir(outRoot)
await fs.mkdir(resolve(outRoot, 'types'))

const schemaFiles = await readSchemaFiles(schemasRoot)
const tsFiles = await generateTypes(schemaFiles)
for (let { filePath, contents } of tsFiles) {
  await fs.writeFile(resolve(outRoot, filePath), contents)
}
const validations = generateValidations(schemaFiles)
await fs.writeFile(resolve(outRoot, 'validations.ts'), validations)
