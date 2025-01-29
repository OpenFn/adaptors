import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("AdministrableProductDefinition", () => {
    it("should create a simple AdministrableProductDefinition", () => {
        const resource = builders.administrableProductDefinition({});
        assert.isOk(resource);
    });
});