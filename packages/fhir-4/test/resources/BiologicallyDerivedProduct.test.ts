import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("BiologicallyDerivedProduct", () => {
    it("should create a simple BiologicallyDerivedProduct", () => {
        const resource = builders.biologicallyDerivedProduct({});
        assert.isOk(resource);
    });
});