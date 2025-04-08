import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("MedicinalProductDefinition", () => {
    it("should create a simple MedicinalProductDefinition", () => {
        const resource = builders.medicinalProductDefinition({});
        assert.isOk(resource);
    });
});