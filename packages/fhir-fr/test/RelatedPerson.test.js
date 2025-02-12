import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-related-person", () => {
    it("should create a simple fr-core-related-person", () => {
        const resource = builders.relatedPerson("fr-core-related-person", {});
        assert.isOk(resource);
    });
});