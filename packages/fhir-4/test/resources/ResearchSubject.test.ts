import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ResearchSubject", () => {
    it("should create a simple ResearchSubject", () => {
        const resource = builders.researchSubject({});
        assert.isOk(resource);
    });
});