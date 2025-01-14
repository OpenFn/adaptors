import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("EvidenceReport", () => {
    it("should create a simple EvidenceReport", () => {
        const resource = builders.evidenceReport("EvidenceReport", {});
        assert.isOk(resource);
    });
});