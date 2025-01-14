import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("RelatedPerson", () => {
    it("should create a simple RelatedPerson", () => {
        const resource = builders.relatedPerson("RelatedPerson", {});
        assert.isOk(resource);
    });
});