import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("InsurancePlan", () => {
    it("should create a simple InsurancePlan", () => {
        const resource = builders.insurancePlan("InsurancePlan", {});
        assert.isOk(resource);
    });
});