import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("PaymentReconciliation", () => {
    it("should create a simple PaymentReconciliation", () => {
        const resource = builders.paymentReconciliation({});
        assert.isOk(resource);
    });
});