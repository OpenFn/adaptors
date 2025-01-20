import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("SubscriptionStatus", () => {
    it("should create a simple SubscriptionStatus", () => {
        const resource = builders.subscriptionStatus({});
        assert.isOk(resource);
    });
});