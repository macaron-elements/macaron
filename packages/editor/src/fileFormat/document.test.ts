import path from "path";
import fs from "fs";
import url from "url";
import { describe, it, expect } from "vitest";
import { Document } from "../models/Document";
import { parseDocument, stringifyDocument } from "./document";

const __filename = url.fileURLToPath(import.meta.url);
const fixtureFilePath = path.resolve(
  __filename,
  "../../../../test-project/test.macaron"
);

describe("File format", () => {
  it("should parse and stringify a document", () => {
    const data = fs.readFileSync(fixtureFilePath, "utf-8");
    const doc = new Document();
    parseDocument(doc, data);
    const saved = stringifyDocument(doc);
    expect(saved).toBe(data.replaceAll("\r", ""));
  });
});
