import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MolecularSequence", () => {
    it("should create a simple MolecularSequence", () => {
        const resource = builders.molecularSequence({});
        assert.isOk(resource);
    });
});