import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("SupplyRequest", () => {
    it("should create a simple SupplyRequest", () => {
        const resource = builders.supplyRequest({});
        assert.isOk(resource);
    });
});