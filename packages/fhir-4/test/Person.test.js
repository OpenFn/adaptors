import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("Person", () => {
    it("should create a simple Person", () => {
        const resource = builders.person("Person", {});
        assert.isOk(resource);
    });
});