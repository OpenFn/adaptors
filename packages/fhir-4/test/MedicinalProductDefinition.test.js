import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MedicinalProductDefinition", () => {
    it("should create a simple MedicinalProductDefinition", () => {
        const resource = builders.medicinalProductDefinition("MedicinalProductDefinition", {});
        assert.isOk(resource);
    });
});