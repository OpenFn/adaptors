import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ImplementationGuide", () => {
    it("should create a simple ImplementationGuide", () => {
        const resource = builders.implementationGuide("ImplementationGuide", {});
        assert.isOk(resource);
    });
});