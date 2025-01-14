import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Goal", () => {
    it("should create a simple Goal", () => {
        const resource = builders.goal("Goal", {});
        assert.isOk(resource);
    });
});