import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("SubscriptionTopic", () => {
    it("should create a simple SubscriptionTopic", () => {
        const resource = builders.subscriptionTopic({});
        assert.isOk(resource);
    });
});