import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("List", () => {
    it("should create a simple List", () => {
        const resource = builders.list("List", {});
        assert.isOk(resource);
    });
});