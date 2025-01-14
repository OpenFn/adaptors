import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("StructureMap", () => {
    it("should create a simple StructureMap", () => {
        const resource = builders.structureMap("StructureMap", {});
        assert.isOk(resource);
    });
});