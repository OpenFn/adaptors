import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ObservationDefinition", () => {
    it("should create a simple ObservationDefinition", () => {
        const resource = builders.observationDefinition({});
        assert.isOk(resource);
    });
});