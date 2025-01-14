import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CodeSystem", () => {
    it("should create a simple CodeSystem", () => {
        const resource = builders.codeSystem("CodeSystem", {});
        assert.isOk(resource);
    });
});