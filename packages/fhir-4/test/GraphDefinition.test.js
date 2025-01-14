import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("GraphDefinition", () => {
    it("should create a simple GraphDefinition", () => {
        const resource = builders.graphDefinition("GraphDefinition", {});
        assert.isOk(resource);
    });
});