import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DocumentManifest", () => {
    it("should create a simple DocumentManifest", () => {
        const resource = builders.documentManifest("DocumentManifest", {});
        assert.isOk(resource);
    });
});