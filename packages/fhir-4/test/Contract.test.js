import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Contract", () => {
    it("should create a simple Contract", () => {
        const resource = builders.contract("Contract", {});
        assert.isOk(resource);
    });
});