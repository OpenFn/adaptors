import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("OrganizationAffiliation", () => {
    it("should create a simple OrganizationAffiliation", () => {
        const resource = builders.organizationAffiliation({});
        assert.isOk(resource);
    });
});