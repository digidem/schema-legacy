import fs from "node:fs/promises";
import { compile } from "json-schema-to-typescript";
import { resolve } from "node:path";
import { capitalize } from "../utils.js";

const out = "types";

/**
 * @param {Array<{contents:JSON, filePath:string}>} schemaFiles
 * @returns {Promise<Array<{contents:string, filePath:string}>>}
 */
export default async function (schemaFiles) {
  const tsFiles = [];
  for (let { contents, filePath } of schemaFiles) {
    const tsFilePath = schemaFileToTsFile(filePath);
    //const fullPath = resolve(out, tsFilePath);
    const ts = await compile(contents);
    tsFiles.push({
      filePath: `${out}/${tsFilePath}`,
      contents: ts,
    });
  }
  return tsFiles;
}

/**
 * @param {String} fullPath
 * @returns {String}
 */
function schemaFileToTsFile(fullPath) {
  const [schemaName, schemaFile] = fullPath.split("/");
  const [version] = schemaFile.split(".").map((v) => v.replace("v", ""));
  return `${capitalize(schemaName)}_${version}.d.ts`;
}
