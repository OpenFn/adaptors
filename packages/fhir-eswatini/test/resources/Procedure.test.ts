import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzProcedure", () => {
    it("should create a simple SzProcedure", () => {
        const resource = builders.procedure("SzProcedure", {});
        assert.isOk(resource);
    });
});