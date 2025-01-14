import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Resource", () => {
    it("should create a simple Resource", () => {
        const resource = builders.resource("Resource", {});
        assert.isOk(resource);
    });
});