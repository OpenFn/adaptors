import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("SubscriptionStatus", () => {
    it("should create a simple SubscriptionStatus", () => {
        const resource = builders.subscriptionStatus("SubscriptionStatus", {});
        assert.isOk(resource);
    });
});