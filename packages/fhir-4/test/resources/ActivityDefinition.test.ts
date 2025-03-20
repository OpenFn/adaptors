import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ActivityDefinition", () => {
    it("should create a simple ActivityDefinition", () => {
        const resource = builders.activityDefinition({});
        assert.isOk(resource);
    });
});