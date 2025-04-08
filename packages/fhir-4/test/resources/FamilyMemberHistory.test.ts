import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("FamilyMemberHistory", () => {
    it("should create a simple FamilyMemberHistory", () => {
        const resource = builders.familyMemberHistory({});
        assert.isOk(resource);
    });
});