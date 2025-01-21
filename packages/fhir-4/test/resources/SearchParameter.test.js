import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("SearchParameter", () => {
    it("should create a simple SearchParameter", () => {
        const resource = builders.searchParameter({});
        assert.isOk(resource);
    });
});