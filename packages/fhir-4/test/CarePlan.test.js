import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CarePlan", () => {
    it("should create a simple CarePlan", () => {
        const resource = builders.carePlan("CarePlan", {});
        assert.isOk(resource);
    });
});