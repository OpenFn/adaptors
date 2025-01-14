import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("SearchParameter", () => {
    it("should create a simple SearchParameter", () => {
        const resource = builders.searchParameter("SearchParameter", {});
        assert.isOk(resource);
    });
});