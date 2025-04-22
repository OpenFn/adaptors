import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SupplyRequest", () => {
    it("should create a simple SupplyRequest", () => {
        const resource = builders.supplyRequest({});
        assert.isOk(resource);
    });
});