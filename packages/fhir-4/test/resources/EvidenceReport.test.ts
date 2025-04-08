import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("EvidenceReport", () => {
    it("should create a simple EvidenceReport", () => {
        const resource = builders.evidenceReport({});
        assert.isOk(resource);
    });
});