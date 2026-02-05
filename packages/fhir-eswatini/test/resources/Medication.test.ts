import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzMedication", () => {
    it("should create a simple SzMedication", () => {
        const resource = builders.medication("SzMedication", {});
        assert.isOk(resource);
    });
});