import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Flag", () => {
    it("should create a simple Flag", () => {
        const resource = builders.flag("Flag", {});
        assert.isOk(resource);
    });
});