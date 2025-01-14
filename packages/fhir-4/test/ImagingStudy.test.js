import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ImagingStudy", () => {
    it("should create a simple ImagingStudy", () => {
        const resource = builders.imagingStudy("ImagingStudy", {});
        assert.isOk(resource);
    });
});