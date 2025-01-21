import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("OrganizationAffiliation", () => {
    it("should create a simple OrganizationAffiliation", () => {
        const resource = builders.organizationAffiliation({});
        assert.isOk(resource);
    });
});