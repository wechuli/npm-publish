/** Wrapper module for command-line-args */

import commandLineArgs from "command-line-args";
import type { Options } from "../options.js";

const ARGUMENTS_OPTIONS = [
  { name: "package", type: String, defaultOption: true },
  { name: "token", type: String },
  { name: "registry", type: String },
  { name: "tag", type: String },
  { name: "access", type: String },
  { name: "strategy", type: String },
  { name: "dry-run", type: Boolean },
  { name: "quiet", type: Boolean },
  { name: "debug", type: Boolean },
  { name: "version", alias: "v", type: Boolean },
  { name: "help", alias: "h", type: Boolean },
];

/** The parsed command-line arguments */
export interface ParsedArguments {
  help?: boolean;
  version?: boolean;
  quiet?: boolean;
  debug?: boolean;
  options: Options;
}

/**
 * Parse the given command-line arguments.
 *
 * @param argv The list of argument strings passed to the program.
 * @returns A parsed object of options.
 */
export function parseCliArguments(argv: string[]): ParsedArguments {
  const { help, version, quiet, debug, ...options } = commandLineArgs(
    ARGUMENTS_OPTIONS,
    { argv, camelCase: true }
  );

  return {
    help: Boolean(help),
    version: Boolean(version),
    quiet: Boolean(quiet),
    debug: Boolean(debug),
    options: options as Options,
  };
}
