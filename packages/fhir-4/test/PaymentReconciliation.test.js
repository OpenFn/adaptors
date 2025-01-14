import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("PaymentReconciliation", () => {
    it("should create a simple PaymentReconciliation", () => {
        const resource = builders.paymentReconciliation("PaymentReconciliation", {});
        assert.isOk(resource);
    });
});