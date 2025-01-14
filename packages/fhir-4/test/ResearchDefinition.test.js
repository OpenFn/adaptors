import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ResearchDefinition", () => {
    it("should create a simple ResearchDefinition", () => {
        const resource = builders.researchDefinition("ResearchDefinition", {});
        assert.isOk(resource);
    });
});