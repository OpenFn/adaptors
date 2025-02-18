import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("AdministrableProductDefinition", () => {
    it("should create a simple AdministrableProductDefinition", () => {
        const resource = builders.administrableProductDefinition({});
        assert.isOk(resource);
    });
});