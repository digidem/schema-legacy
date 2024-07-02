import Ajv from "ajv";
import standaloneCode from "ajv/dist/standalone/index.js";

/**
 * @param {Array<{contents:JSON, filePath:string}>} schemaFiles
 */
export default function (schemaFiles) {
  const schemaExports = schemaFiles.reduce(
    (acc, { contents: jsonSchema, filePath }) => {
      const [schemaName] = filePath.split("/");
      if (!jsonSchema["$id"])
        throw new Error(`Missing $id prop on ${schemaName}`);
      acc[schemaName] = jsonSchema["$id"];
      return acc;
    },
    /** @type {Record<string, string>} */ ({}),
  );

  const ajv = new Ajv({
    schemas: schemaFiles.map((schemaFile) => schemaFile.contents),
    code: { source: true, esm: true },
    formats: { "date-time": true },
  });
  ajv.addKeyword("meta:enum");

  return "// @ts-nocheck\n" + standaloneCode(ajv, schemaExports);
}
