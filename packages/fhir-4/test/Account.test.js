import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Account", () => {
    it("should create a simple Account", () => {
        const resource = builders.account("Account", {});
        assert.isOk(resource);
    });
});