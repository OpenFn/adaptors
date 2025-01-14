import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("SpecimenDefinition", () => {
    it("should create a simple SpecimenDefinition", () => {
        const resource = builders.specimenDefinition("SpecimenDefinition", {});
        assert.isOk(resource);
    });
});