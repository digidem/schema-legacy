import fs from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * @param {String} root
 * @returns {Promise<Array<{contents:JSON, filePath:string}>>}
 */
export default async function (root) {
  const schemaFiles = await fs.readdir(root, { recursive: true })
  const files = []
  for (let file of schemaFiles) {
    const fullPath = resolve(root, file)
    const f = await fs.stat(fullPath)
    if (f.isFile()) {
      files.push({
        contents: JSON.parse((await fs.readFile(fullPath)).toString()),
        filePath: file,
      })
    }
  }
  return files
}
