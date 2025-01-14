import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("NamingSystem", () => {
    it("should create a simple NamingSystem", () => {
        const resource = builders.namingSystem("NamingSystem", {});
        assert.isOk(resource);
    });
});