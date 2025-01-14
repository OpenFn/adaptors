import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Group", () => {
    it("should create a simple Group", () => {
        const resource = builders.group("Group", {});
        assert.isOk(resource);
    });
});