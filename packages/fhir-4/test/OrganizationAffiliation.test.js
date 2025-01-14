import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("OrganizationAffiliation", () => {
    it("should create a simple OrganizationAffiliation", () => {
        const resource = builders.organizationAffiliation("OrganizationAffiliation", {});
        assert.isOk(resource);
    });
});