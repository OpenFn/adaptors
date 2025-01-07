import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-contact-point", () => {
    it("should create a simple fr-core-contact-point", () => {
        const resource = builders.contactPoint("fr-core-contact-point", {});
        assert.isOk(resource);
    });
});