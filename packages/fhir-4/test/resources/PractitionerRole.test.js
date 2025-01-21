import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("PractitionerRole", () => {
    it("should create a simple PractitionerRole", () => {
        const resource = builders.practitionerRole({});
        assert.isOk(resource);
    });
});