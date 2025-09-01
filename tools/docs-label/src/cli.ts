#!/usr/bin/env node

import yargs from "yargs";
import process from 'node:process';
import { hideBin } from "yargs/helpers";
import { updateBadgeInName } from "./update-badge";



yargs(hideBin(process.argv))
  .command(
    "badge <name>",
    "Append (Core) or (Community) to a single adaptor's display name",
    (y) =>
      y
        .positional("name", {
          type: "string",
          describe: "Adaptor name",
        })
        .option("tier", {
          alias: "t",
          choices: ["core", "community"] as const,
          default: "core",
          describe: "Badge to apply",
        }),
    (args) => {
      updateBadgeInName({
        name: String(args.name),
        tier: args.tier as "core" | "community"
      });
    }
  )
  .demandCommand(1, "Please provide a command, e.g. ` badge <name> --tier core`")
  .fail((msg, err, y) => {
    if (msg) console.error(msg);
    console.log("\nExamples:\n   badge odoo --tier core\n   badge dhis2 --tier community\n");
    console.log(y.help());
    process.exit(1);
  })
  .strict()
  .help()
  .parse();
