import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("TerminologyCapabilities", () => {
    it("should create a simple TerminologyCapabilities", () => {
        const resource = builders.terminologyCapabilities({});
        assert.isOk(resource);
    });
});