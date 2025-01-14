import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CareTeam", () => {
    it("should create a simple CareTeam", () => {
        const resource = builders.careTeam("CareTeam", {});
        assert.isOk(resource);
    });
});