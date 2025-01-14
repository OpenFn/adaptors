import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Subscription", () => {
    it("should create a simple Subscription", () => {
        const resource = builders.subscription("Subscription", {});
        assert.isOk(resource);
    });
});