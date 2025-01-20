import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("MeasureReport", () => {
    it("should create a simple MeasureReport", () => {
        const resource = builders.measureReport({});
        assert.isOk(resource);
    });
});