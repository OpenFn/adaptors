import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ExplanationOfBenefit", () => {
    it("should create a simple ExplanationOfBenefit", () => {
        const resource = builders.explanationOfBenefit("ExplanationOfBenefit", {});
        assert.isOk(resource);
    });
});