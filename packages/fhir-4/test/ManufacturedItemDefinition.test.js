import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ManufacturedItemDefinition", () => {
    it("should create a simple ManufacturedItemDefinition", () => {
        const resource = builders.manufacturedItemDefinition("ManufacturedItemDefinition", {});
        assert.isOk(resource);
    });
});