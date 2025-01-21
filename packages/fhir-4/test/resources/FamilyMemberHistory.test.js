import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("FamilyMemberHistory", () => {
    it("should create a simple FamilyMemberHistory", () => {
        const resource = builders.familyMemberHistory({});
        assert.isOk(resource);
    });
});