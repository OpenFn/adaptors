import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("AllergyIntolerance", () => {
    it("should create a simple AllergyIntolerance", () => {
        const resource = builders.allergyIntolerance("AllergyIntolerance", {});
        assert.isOk(resource);
    });
});