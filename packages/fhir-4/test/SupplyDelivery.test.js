import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("SupplyDelivery", () => {
    it("should create a simple SupplyDelivery", () => {
        const resource = builders.supplyDelivery("SupplyDelivery", {});
        assert.isOk(resource);
    });
});