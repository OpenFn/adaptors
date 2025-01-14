import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CommunicationRequest", () => {
    it("should create a simple CommunicationRequest", () => {
        const resource = builders.communicationRequest("CommunicationRequest", {});
        assert.isOk(resource);
    });
});