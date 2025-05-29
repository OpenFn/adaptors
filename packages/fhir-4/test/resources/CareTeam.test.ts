import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("CareTeam", () => {
    it("should create a simple CareTeam", () => {
        const resource = builders.careTeam({});
        assert.isOk(resource);
    });
});