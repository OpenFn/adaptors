import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("CarePlan", () => {
    it("should create a simple CarePlan", () => {
        const resource = builders.carePlan({});
        assert.isOk(resource);
    });
});