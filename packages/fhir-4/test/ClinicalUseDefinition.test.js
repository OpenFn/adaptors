import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ClinicalUseDefinition", () => {
    it("should create a simple ClinicalUseDefinition", () => {
        const resource = builders.clinicalUseDefinition("ClinicalUseDefinition", {});
        assert.isOk(resource);
    });
});