import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ChargeItem", () => {
    it("should create a simple ChargeItem", () => {
        const resource = builders.chargeItem({});
        assert.isOk(resource);
    });
});