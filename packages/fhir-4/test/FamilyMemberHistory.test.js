import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("FamilyMemberHistory", () => {
    it("should create a simple FamilyMemberHistory", () => {
        const resource = builders.familyMemberHistory("FamilyMemberHistory", {});
        assert.isOk(resource);
    });
});