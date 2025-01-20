import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ServiceRequest", () => {
    it("should create a simple ServiceRequest", () => {
        const resource = builders.serviceRequest({});
        assert.isOk(resource);
    });
});