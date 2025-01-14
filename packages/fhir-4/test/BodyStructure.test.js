import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("BodyStructure", () => {
    it("should create a simple BodyStructure", () => {
        const resource = builders.bodyStructure("BodyStructure", {});
        assert.isOk(resource);
    });
});