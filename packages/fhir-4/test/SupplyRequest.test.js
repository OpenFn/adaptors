import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("SupplyRequest", () => {
    it("should create a simple SupplyRequest", () => {
        const resource = builders.supplyRequest("SupplyRequest", {});
        assert.isOk(resource);
    });
});