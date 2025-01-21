import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("CodeSystem", () => {
    it("should create a simple CodeSystem", () => {
        const resource = builders.codeSystem({});
        assert.isOk(resource);
    });
});