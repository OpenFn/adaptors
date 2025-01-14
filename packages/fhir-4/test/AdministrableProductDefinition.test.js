import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("AdministrableProductDefinition", () => {
    it("should create a simple AdministrableProductDefinition", () => {
        const resource = builders.administrableProductDefinition("AdministrableProductDefinition", {});
        assert.isOk(resource);
    });
});