import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Communication", () => {
    it("should create a simple Communication", () => {
        const resource = builders.communication("Communication", {});
        assert.isOk(resource);
    });
});