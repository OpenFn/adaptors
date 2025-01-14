import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ResearchStudy", () => {
    it("should create a simple ResearchStudy", () => {
        const resource = builders.researchStudy("ResearchStudy", {});
        assert.isOk(resource);
    });
});