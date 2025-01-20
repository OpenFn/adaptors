import { expect, assert } from "chai";
import { builders } from "@openfn/language-fhir-4";

describe("QuestionnaireResponse", () => {
    it("should create a simple QuestionnaireResponse", () => {
        const resource = builders.questionnaireResponse({});
        assert.isOk(resource);
    });
});