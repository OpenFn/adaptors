import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Subscription", () => {
    it("should create a simple Subscription", () => {
        const resource = builders.subscription({});
        assert.isOk(resource);
    });
});