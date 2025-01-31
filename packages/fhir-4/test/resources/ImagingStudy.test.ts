import { expect, assert } from "chai";
import { builders } from "../../src/index";

describe("ImagingStudy", () => {
    it("should create a simple ImagingStudy", () => {
        const resource = builders.imagingStudy({});
        assert.isOk(resource);
    });
});