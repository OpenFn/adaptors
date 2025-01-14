import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ChargeItemDefinition", () => {
    it("should create a simple ChargeItemDefinition", () => {
        const resource = builders.chargeItemDefinition("ChargeItemDefinition", {});
        assert.isOk(resource);
    });
});