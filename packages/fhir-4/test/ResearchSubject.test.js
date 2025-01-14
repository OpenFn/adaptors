import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ResearchSubject", () => {
    it("should create a simple ResearchSubject", () => {
        const resource = builders.researchSubject("ResearchSubject", {});
        assert.isOk(resource);
    });
});