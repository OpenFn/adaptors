import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Library", () => {
    it("should create a simple Library", () => {
        const resource = builders.library("Library", {});
        assert.isOk(resource);
    });
});