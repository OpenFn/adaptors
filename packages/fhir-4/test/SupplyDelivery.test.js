import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("SupplyDelivery", () => {
    it("should create a simple SupplyDelivery", () => {
        const resource = builders.supplyDelivery({});
        assert.isOk(resource);
    });
});