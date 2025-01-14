import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ChargeItem", () => {
    it("should create a simple ChargeItem", () => {
        const resource = builders.chargeItem("ChargeItem", {});
        assert.isOk(resource);
    });
});