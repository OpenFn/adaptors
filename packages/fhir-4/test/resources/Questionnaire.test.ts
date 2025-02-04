import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("Questionnaire", () => {
    it("should create a simple Questionnaire", () => {
        const resource = builders.questionnaire({});
        assert.isOk(resource);
    });
});