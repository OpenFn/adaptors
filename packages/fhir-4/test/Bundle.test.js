import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Bundle", () => {
    it("should create a simple Bundle", () => {
        const resource = builders.bundle("Bundle", {});
        assert.isOk(resource);
    });
});