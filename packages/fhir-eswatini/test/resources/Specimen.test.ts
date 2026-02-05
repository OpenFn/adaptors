import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzLabSpecimen", () => {
    it("should create a simple SzLabSpecimen", () => {
        const resource = builders.specimen("SzLabSpecimen", {});
        assert.isOk(resource);
    });
});