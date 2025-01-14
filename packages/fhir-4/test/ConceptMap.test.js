import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ConceptMap", () => {
    it("should create a simple ConceptMap", () => {
        const resource = builders.conceptMap("ConceptMap", {});
        assert.isOk(resource);
    });
});