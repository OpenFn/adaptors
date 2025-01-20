import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DomainResource", () => {
    it("should create a simple DomainResource", () => {
        const resource = builders.domainResource({});
        assert.isOk(resource);
    });
});