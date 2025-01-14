import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ActivityDefinition", () => {
    it("should create a simple ActivityDefinition", () => {
        const resource = builders.activityDefinition("ActivityDefinition", {});
        assert.isOk(resource);
    });
});