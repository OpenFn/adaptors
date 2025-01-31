import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("PaymentNotice", () => {
    it("should create a simple PaymentNotice", () => {
        const resource = builders.paymentNotice({});
        assert.isOk(resource);
    });
});