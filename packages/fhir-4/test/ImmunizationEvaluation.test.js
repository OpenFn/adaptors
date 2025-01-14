import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ImmunizationEvaluation", () => {
    it("should create a simple ImmunizationEvaluation", () => {
        const resource = builders.immunizationEvaluation("ImmunizationEvaluation", {});
        assert.isOk(resource);
    });
});