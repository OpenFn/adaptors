import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzEncounter", () => {
    it("should create a simple SzEncounter", () => {
        const resource = builders.encounter("SzEncounter", {});
        assert.isOk(resource);
    });
});