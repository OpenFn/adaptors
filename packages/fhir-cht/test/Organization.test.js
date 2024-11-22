import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-organization", () => {
    it("should create a simple fr-core-organization", () => {
        const resource = builders.organization("fr-core-organization", {});
        assert.isOk(resource);
    });
});

describe("fr-core-organization-pole", () => {
    it("should create a simple fr-core-organization-pole", () => {
        const resource = builders.organization("fr-core-organization-pole", {});
        assert.isOk(resource);
    });
});

describe("fr-core-organization-uac", () => {
    it("should create a simple fr-core-organization-uac", () => {
        const resource = builders.organization("fr-core-organization-uac", {});
        assert.isOk(resource);
    });
});

describe("fr-core-organization-uf", () => {
    it("should create a simple fr-core-organization-uf", () => {
        const resource = builders.organization("fr-core-organization-uf", {});
        assert.isOk(resource);
    });
});