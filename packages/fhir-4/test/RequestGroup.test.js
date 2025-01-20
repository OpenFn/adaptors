import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("RequestGroup", () => {
    it("should create a simple RequestGroup", () => {
        const resource = builders.requestGroup({});
        assert.isOk(resource);
    });
});