import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("DocumentReference", () => {
    it("should create a simple DocumentReference", () => {
        const resource = builders.documentReference({});
        assert.isOk(resource);
    });
});