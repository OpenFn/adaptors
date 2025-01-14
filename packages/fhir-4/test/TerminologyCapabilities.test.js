import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("TerminologyCapabilities", () => {
    it("should create a simple TerminologyCapabilities", () => {
        const resource = builders.terminologyCapabilities("TerminologyCapabilities", {});
        assert.isOk(resource);
    });
});