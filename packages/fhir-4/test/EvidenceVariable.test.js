import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("EvidenceVariable", () => {
    it("should create a simple EvidenceVariable", () => {
        const resource = builders.evidenceVariable("EvidenceVariable", {});
        assert.isOk(resource);
    });
});