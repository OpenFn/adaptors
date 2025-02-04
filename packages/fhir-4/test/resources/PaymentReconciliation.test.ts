import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("PaymentReconciliation", () => {
    it("should create a simple PaymentReconciliation", () => {
        const resource = builders.paymentReconciliation({});
        assert.isOk(resource);
    });
});