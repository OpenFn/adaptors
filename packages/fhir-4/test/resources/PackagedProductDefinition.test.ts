import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("PackagedProductDefinition", () => {
    it("should create a simple PackagedProductDefinition", () => {
        const resource = builders.packagedProductDefinition({});
        assert.isOk(resource);
    });
});