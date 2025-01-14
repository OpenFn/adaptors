import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("EventDefinition", () => {
    it("should create a simple EventDefinition", () => {
        const resource = builders.eventDefinition("EventDefinition", {});
        assert.isOk(resource);
    });
});