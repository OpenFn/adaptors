import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ClinicalImpression", () => {
    it("should create a simple ClinicalImpression", () => {
        const resource = builders.clinicalImpression("ClinicalImpression", {});
        assert.isOk(resource);
    });
});