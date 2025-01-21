import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("CatalogEntry", () => {
    it("should create a simple CatalogEntry", () => {
        const resource = builders.catalogEntry({});
        assert.isOk(resource);
    });
});