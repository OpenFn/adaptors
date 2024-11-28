import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-encounter", () => {
    it("should create a simple fr-core-encounter", () => {
        const resource = builders.encounter("fr-core-encounter", {});
        assert.isOk(resource);
    });
});