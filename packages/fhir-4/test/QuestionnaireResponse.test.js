import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("QuestionnaireResponse", () => {
    it("should create a simple QuestionnaireResponse", () => {
        const resource = builders.questionnaireResponse("QuestionnaireResponse", {});
        assert.isOk(resource);
    });
});