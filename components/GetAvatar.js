import { Component } from "@noflo/noflo";

/**
 * Builds the Gravatar avatar URL for an email address.
 *
 * Uses Gravatar's SHA-256 avatar URLs and the Web-standard `crypto.subtle`,
 * making the component multiplatform (Node, Deno, Bun, browser). SHA-256
 * URLs serve the same avatar as the legacy MD5 form, but the URL string
 * itself differs from the pre-2.x MD5 output.
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

  c.process((input) => {
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
    // Promise-pure style: the resolved output map becomes an implicit sendDone
    return crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(email.trim().toLowerCase()))
      .then((digest) => {
        const hash = [...new Uint8Array(digest)]
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        return { avatar: `https://s.gravatar.com/avatar/${hash}?s=${size}` };
      });
  });

  return c;
}
