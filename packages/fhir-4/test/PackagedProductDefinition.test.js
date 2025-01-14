import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("PackagedProductDefinition", () => {
    it("should create a simple PackagedProductDefinition", () => {
        const resource = builders.packagedProductDefinition("PackagedProductDefinition", {});
        assert.isOk(resource);
    });
});