import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Communication", () => {
    it("should create a simple Communication", () => {
        const resource = builders.communication({});
        assert.isOk(resource);
    });
});