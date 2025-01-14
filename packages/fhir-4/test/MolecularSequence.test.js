import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MolecularSequence", () => {
    it("should create a simple MolecularSequence", () => {
        const resource = builders.molecularSequence("MolecularSequence", {});
        assert.isOk(resource);
    });
});