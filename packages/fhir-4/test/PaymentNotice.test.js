import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("PaymentNotice", () => {
    it("should create a simple PaymentNotice", () => {
        const resource = builders.paymentNotice("PaymentNotice", {});
        assert.isOk(resource);
    });
});