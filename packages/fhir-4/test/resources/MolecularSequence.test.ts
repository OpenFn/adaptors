import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("MolecularSequence", () => {
    it("should create a simple MolecularSequence", () => {
        const resource = builders.molecularSequence({});
        assert.isOk(resource);
    });
});