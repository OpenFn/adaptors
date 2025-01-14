import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Organization", () => {
    it("should create a simple Organization", () => {
        const resource = builders.organization("Organization", {});
        assert.isOk(resource);
    });
});