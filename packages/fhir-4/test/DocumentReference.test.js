import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DocumentReference", () => {
    it("should create a simple DocumentReference", () => {
        const resource = builders.documentReference("DocumentReference", {});
        assert.isOk(resource);
    });
});