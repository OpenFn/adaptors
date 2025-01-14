import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Citation", () => {
    it("should create a simple Citation", () => {
        const resource = builders.citation("Citation", {});
        assert.isOk(resource);
    });
});