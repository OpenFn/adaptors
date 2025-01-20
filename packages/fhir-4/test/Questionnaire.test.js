import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("Questionnaire", () => {
    it("should create a simple Questionnaire", () => {
        const resource = builders.questionnaire({});
        assert.isOk(resource);
    });
});