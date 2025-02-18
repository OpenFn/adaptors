import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ManufacturedItemDefinition", () => {
    it("should create a simple ManufacturedItemDefinition", () => {
        const resource = builders.manufacturedItemDefinition({});
        assert.isOk(resource);
    });
});