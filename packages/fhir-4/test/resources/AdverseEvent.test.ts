import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("AdverseEvent", () => {
    it("should create a simple AdverseEvent", () => {
        const resource = builders.adverseEvent({});
        assert.isOk(resource);
    });
});