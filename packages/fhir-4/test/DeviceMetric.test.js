import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DeviceMetric", () => {
    it("should create a simple DeviceMetric", () => {
        const resource = builders.deviceMetric("DeviceMetric", {});
        assert.isOk(resource);
    });
});