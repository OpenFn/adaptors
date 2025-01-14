import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("ExampleScenario", () => {
    it("should create a simple ExampleScenario", () => {
        const resource = builders.exampleScenario("ExampleScenario", {});
        assert.isOk(resource);
    });
});