import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Questionnaire", () => {
    it("should create a simple Questionnaire", () => {
        const resource = builders.questionnaire("Questionnaire", {});
        assert.isOk(resource);
    });
});