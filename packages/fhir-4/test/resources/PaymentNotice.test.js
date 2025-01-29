import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("PaymentNotice", () => {
    it("should create a simple PaymentNotice", () => {
        const resource = builders.paymentNotice({});
        assert.isOk(resource);
    });
});