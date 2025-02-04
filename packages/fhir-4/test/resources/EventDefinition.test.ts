import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("EventDefinition", () => {
    it("should create a simple EventDefinition", () => {
        const resource = builders.eventDefinition({});
        assert.isOk(resource);
    });
});