import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SupplyDelivery", () => {
    it("should create a simple SupplyDelivery", () => {
        const resource = builders.supplyDelivery({});
        assert.isOk(resource);
    });
});