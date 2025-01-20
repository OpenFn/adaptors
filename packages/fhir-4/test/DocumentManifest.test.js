import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DocumentManifest", () => {
    it("should create a simple DocumentManifest", () => {
        const resource = builders.documentManifest({});
        assert.isOk(resource);
    });
});