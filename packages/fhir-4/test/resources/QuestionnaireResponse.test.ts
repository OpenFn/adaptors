import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("QuestionnaireResponse", () => {
    it("should create a simple QuestionnaireResponse", () => {
        const resource = builders.questionnaireResponse({});
        assert.isOk(resource);
    });
});