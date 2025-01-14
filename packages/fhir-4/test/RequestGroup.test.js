import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("RequestGroup", () => {
    it("should create a simple RequestGroup", () => {
        const resource = builders.requestGroup("RequestGroup", {});
        assert.isOk(resource);
    });
});