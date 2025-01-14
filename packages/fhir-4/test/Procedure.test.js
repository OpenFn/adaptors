import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Procedure", () => {
    it("should create a simple Procedure", () => {
        const resource = builders.procedure("Procedure", {});
        assert.isOk(resource);
    });
});