import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("GuidanceResponse", () => {
    it("should create a simple GuidanceResponse", () => {
        const resource = builders.guidanceResponse("GuidanceResponse", {});
        assert.isOk(resource);
    });
});