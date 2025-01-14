import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ObservationDefinition", () => {
    it("should create a simple ObservationDefinition", () => {
        const resource = builders.observationDefinition("ObservationDefinition", {});
        assert.isOk(resource);
    });
});