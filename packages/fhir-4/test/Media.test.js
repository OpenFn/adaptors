import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Media", () => {
    it("should create a simple Media", () => {
        const resource = builders.media("Media", {});
        assert.isOk(resource);
    });
});