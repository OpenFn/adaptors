import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ChargeItemDefinition", () => {
    it("should create a simple ChargeItemDefinition", () => {
        const resource = builders.chargeItemDefinition({});
        assert.isOk(resource);
    });
});