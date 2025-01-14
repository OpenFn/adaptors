import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("AdverseEvent", () => {
    it("should create a simple AdverseEvent", () => {
        const resource = builders.adverseEvent("AdverseEvent", {});
        assert.isOk(resource);
    });
});