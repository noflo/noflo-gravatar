import { createHash } from "node:crypto";

import { Component } from "@noflo/noflo";

/**
 * Builds the Gravatar avatar URL for an email address.
 *
 * Replaces the legacy `gravatar` package dependency: the URL form matches
 * `gravatar.url(email, { s: size }, true)` from gravatar 1.x, including
 * email normalization (trim + lowercase) before hashing.
 * @returns {import("@noflo/noflo").Component} The configured component
 */
export function getComponent() {
  const c = new Component({
    description: "Get avatar URL for a given email",
    inPorts: {
      email: {
        datatype: "string",
        description: "Email address to hash into a Gravatar avatar URL",
        required: true,
      },
      size: {
        datatype: "int",
        description: "Desired avatar size in pixels",
        control: true,
        default: 200,
      },
    },
    outPorts: {
      avatar: {
        datatype: "string",
        description: "HTTPS URL of the Gravatar avatar",
      },
    },
  });

  // Stream grouping on the firing port carries through to the avatar output
  c.forwardBrackets = { email: ["avatar"] };

  c.process((input, output) => {
    if (!input.hasData("email")) {
      return;
    }
    // When a size connection is attached but has not delivered yet, defer
    // firing so a late size IIP is not missed
    if (input.attached("size").length && !input.hasData("size")) {
      return;
    }
    const email = input.getData("email");
    const size = input.hasData("size") ? input.getData("size") : 200;
    const hash = createHash("md5")
      .update(email.trim().toLowerCase())
      .digest("hex");
    output.sendDone({
      avatar: `https://s.gravatar.com/avatar/${hash}?s=${size}`,
    });
  });

  return c;
}
