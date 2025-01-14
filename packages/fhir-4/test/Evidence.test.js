import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Evidence", () => {
    it("should create a simple Evidence", () => {
        const resource = builders.evidence("Evidence", {});
        assert.isOk(resource);
    });
});