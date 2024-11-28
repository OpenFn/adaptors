import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-human-name", () => {
    it("should create a simple fr-core-human-name", () => {
        const resource = builders.humanName("fr-core-human-name", {});
        assert.isOk(resource);
    });
});