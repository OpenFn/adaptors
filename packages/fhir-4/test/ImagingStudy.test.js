import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("ImagingStudy", () => {
    it("should create a simple ImagingStudy", () => {
        const resource = builders.imagingStudy({});
        assert.isOk(resource);
    });
});