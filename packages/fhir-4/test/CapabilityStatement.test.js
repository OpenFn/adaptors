import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CapabilityStatement", () => {
    it("should create a simple CapabilityStatement", () => {
        const resource = builders.capabilityStatement("CapabilityStatement", {});
        assert.isOk(resource);
    });
});