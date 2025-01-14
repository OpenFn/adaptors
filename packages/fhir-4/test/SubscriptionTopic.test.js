import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("SubscriptionTopic", () => {
    it("should create a simple SubscriptionTopic", () => {
        const resource = builders.subscriptionTopic("SubscriptionTopic", {});
        assert.isOk(resource);
    });
});