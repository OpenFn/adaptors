import { expect, assert } from "chai";
import * as builders from "../src/builders.js";

describe("fr-core-medication-administration-inhaled-oxygen", () => {
    it(
        "should create a simple fr-core-medication-administration-inhaled-oxygen",
        () => {
            const resource = builders.medicationAdministration("fr-core-medication-administration-inhaled-oxygen", {});
            assert.isOk(resource);
        }
    );
});