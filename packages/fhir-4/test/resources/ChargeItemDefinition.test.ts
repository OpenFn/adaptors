import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ChargeItemDefinition", () => {
    it("should create a simple ChargeItemDefinition", () => {
        const resource = builders.chargeItemDefinition({});
        assert.isOk(resource);
    });
});