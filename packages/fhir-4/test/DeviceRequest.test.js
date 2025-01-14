import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("DeviceRequest", () => {
    it("should create a simple DeviceRequest", () => {
        const resource = builders.deviceRequest("DeviceRequest", {});
        assert.isOk(resource);
    });
});