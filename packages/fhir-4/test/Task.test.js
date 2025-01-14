import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Task", () => {
    it("should create a simple Task", () => {
        const resource = builders.task("Task", {});
        assert.isOk(resource);
    });
});