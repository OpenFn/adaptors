import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MessageHeader", () => {
    it("should create a simple MessageHeader", () => {
        const resource = builders.messageHeader("MessageHeader", {});
        assert.isOk(resource);
    });
});