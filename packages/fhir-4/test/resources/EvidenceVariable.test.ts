import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("EvidenceVariable", () => {
    it("should create a simple EvidenceVariable", () => {
        const resource = builders.evidenceVariable({});
        assert.isOk(resource);
    });
});