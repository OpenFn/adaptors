import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Task", () => {
    it("should create a simple Task", () => {
        const resource = builders.task({});
        assert.isOk(resource);
    });
});