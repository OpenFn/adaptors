import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("CatalogEntry", () => {
    it("should create a simple CatalogEntry", () => {
        const resource = builders.catalogEntry("CatalogEntry", {});
        assert.isOk(resource);
    });
});