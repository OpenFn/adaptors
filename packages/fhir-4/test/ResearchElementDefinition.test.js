import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ResearchElementDefinition", () => {
    it("should create a simple ResearchElementDefinition", () => {
        const resource = builders.researchElementDefinition("ResearchElementDefinition", {});
        assert.isOk(resource);
    });
});