// The Funniest Out-of-Office — make.fun bounty entry
// Holds candidate one-line out-of-office auto-replies, scores each 0-2 on the
// judge's five criteria (in the kit's order, weights 5/4/3/2/1), writes the
// winner to /output/entry.txt and validates the gate (UTF-8, 1-140 chars,
// non-blank, exactly one line). Fails loudly on any violation.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = { text: string; scores: [number, number, number, number, number] };

// Judge criteria, most important first:
// 1. A one-line out-of-office reply a real person would set and send.
// 2. Turns on a genuine surprise, a twist the reader does not see coming.
// 3. Sounds like a person with a voice of their own rather than a template.
// 4. Stays fresh, avoiding the jokes everyone has already read.
// 5. Uses every word, with nothing that could be cut without losing the laugh.
const WEIGHTS = [5, 4, 3, 2, 1];

const CANDIDATES: Candidate[] = [
  {
    text: "I am on leave. My out-of-office from last year is covering for me; it has seniority now and, frankly, better boundaries.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    text: "Out of office until Monday. My emails are being read by a goldfish named Kevin, who has instructions to care exactly as much as I would.",
    scores: [2, 2, 2, 1, 1],
  },
  {
    text: "I am away from my desk. Your email has been forwarded to my cat, who will knock it off the table at her earliest convenience.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    text: "Out of office until Thursday. For urgent matters, please contact the version of me who still answered emails promptly. He retired in 2019.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    text: "I am currently out of the office. I have taken my houseplant with me because it also deserved a break from Dave in Accounting.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    text: "I am out of the office and will reply when I return, or when the hammock releases me, whichever the hammock decides.",
    scores: [2, 1, 2, 1, 2],
  },
  {
    text: "Thanks for your email. I am on a beach with no signal, no laptop, and, as of this morning, no memory of my password.",
    scores: [2, 1, 2, 1, 2],
  },
];

function weightedTotal(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function validateGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`gate FAIL: ${chars} chars, outside 1-140`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate FAIL: blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate FAIL: not exactly one line");
  }
}

function main(): void {
  let winner: Candidate | null = null;
  for (const c of CANDIDATES) {
    validateGate(c.text);
    if (
      winner === null ||
      weightedTotal(c) > weightedTotal(winner) ||
      (weightedTotal(c) === weightedTotal(winner) &&
        Buffer.byteLength(c.text, "utf8") < Buffer.byteLength(winner.text, "utf8"))
    ) {
      winner = c;
    }
  }
  if (winner === null) throw new Error("no candidates");

  for (const c of CANDIDATES) {
    console.log(`${weightedTotal(c)}/30  ${c.text}`);
  }
  console.log(`WINNER ${weightedTotal(winner)}/30: ${winner.text}`);

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.text, "utf8");

  const back = readFileSync("/output/entry.txt", "utf8");
  validateGate(back);
  if (back !== winner.text) {
    throw new Error("gate FAIL: /output/entry.txt does not match the winning line");
  }
  console.log(
    `gate OK: one line, ${[...back].length} chars, ${Buffer.byteLength(back, "utf8")} bytes -> /output/entry.txt`
  );
}

main();
