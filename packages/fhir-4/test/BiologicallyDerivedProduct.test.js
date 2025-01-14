import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("BiologicallyDerivedProduct", () => {
    it("should create a simple BiologicallyDerivedProduct", () => {
        const resource = builders.biologicallyDerivedProduct("BiologicallyDerivedProduct", {});
        assert.isOk(resource);
    });
});