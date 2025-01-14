import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CompartmentDefinition", () => {
    it("should create a simple CompartmentDefinition", () => {
        const resource = builders.compartmentDefinition("CompartmentDefinition", {});
        assert.isOk(resource);
    });
});