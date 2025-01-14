import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DeviceDefinition", () => {
    it("should create a simple DeviceDefinition", () => {
        const resource = builders.deviceDefinition("DeviceDefinition", {});
        assert.isOk(resource);
    });
});