import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("StructureDefinition", () => {
    it("should create a simple StructureDefinition", () => {
        const resource = builders.structureDefinition("StructureDefinition", {});
        assert.isOk(resource);
    });
});