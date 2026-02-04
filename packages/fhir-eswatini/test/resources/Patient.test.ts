import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("SzPatient", () => {
    it("should create a simple SzPatient", () => {
        const resource = builders.patient("SzPatient", {});
        assert.isOk(resource);
    });
});