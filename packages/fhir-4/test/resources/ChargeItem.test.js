import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ChargeItem", () => {
    it("should create a simple ChargeItem", () => {
        const resource = builders.chargeItem({});
        assert.isOk(resource);
    });
});