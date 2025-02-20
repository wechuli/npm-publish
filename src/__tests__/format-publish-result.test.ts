import { describe, it, expect } from "vitest";

import * as subject from "../format-publish-result.js";
import type { PackageManifest } from "../read-manifest.js";
import type { NormalizedOptions } from "../normalize-options.js";

describe("formatPublishResult", () => {
  it("should say if a publish was skipped", () => {
    const result = subject.formatPublishResult(
      { name: "cool-package", version: "1.2.3" } as PackageManifest,
      {} as NormalizedOptions
    );

    expect(result).toMatch(/cool-package@1\.2\.3.+skipped/);
  });

  it("should say if a publish was a dry run", () => {
    const result = subject.formatPublishResult(
      { name: "cool-package", version: "1.2.3" } as PackageManifest,
      { dryRun: { value: true } } as NormalizedOptions,
      { id: "cool-package@1.2.3", files: [] }
    );

    expect(result).toMatch(/cool-package@1\.2\.3.+DRY RUN/);
  });

  it("should print files", () => {
    const result = subject.formatPublishResult(
      { name: "cool-package", version: "1.2.3" } as PackageManifest,
      { dryRun: { value: false } } as NormalizedOptions,
      {
        id: "cool-package@1.2.3",
        files: [
          { path: "cool-file-1", size: 1 },
          { path: "cool-file-2", size: 1234 },
          { path: "cool-file-3", size: 5_678_910 },
        ],
      }
    );

    expect(result).not.toMatch(/DRY RUN/);
    expect(result).toContain("cool-package@1.2.3");
    expect(result).toMatch(/1 B.+cool-file-1/);
    expect(result).toMatch(/1.2 kB.+cool-file-2/);
    expect(result).toMatch(/5.7 MB.+cool-file-3/);
  });
});
