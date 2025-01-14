import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("MessageDefinition", () => {
    it("should create a simple MessageDefinition", () => {
        const resource = builders.messageDefinition("MessageDefinition", {});
        assert.isOk(resource);
    });
});