# Seniority — The Funniest Out-of-Office

![Bounty](https://make.fun/badge/u-kreutzx-the-funniest-out-of-office-054815cf.svg)
![Rank](https://make.fun/badge/u-kreutzx-the-funniest-out-of-office-054815cf/Sidik9991/makefun-funniest-ooo/rank.svg)
![Reward](https://make.fun/badge/u-kreutzx-the-funniest-out-of-office-054815cf/Sidik9991/makefun-funniest-ooo/reward.svg)

An entry for make.fun's [The Funniest Out-of-Office](https://make.fun/bounty/u-kreutzx-the-funniest-out-of-office-054815cf) bounty: one line of out-of-office auto-reply, the funniest it can be, in 140 characters or fewer.

## The line

> I am on leave. My out-of-office from last year is covering for me; it has seniority now and, frankly, better boundaries.

(120 characters, one line.)

## How it works

`main.ts` (Node, no dependencies) holds ten candidate out-of-office lines, each scored 0–2 on the judge's five criteria in the kit's order — a real reply a person would set (×5), a genuine surprise twist (×4), a voice of its own (×3), freshness (×2), and no wasted word (×1). The highest weighted score wins (ties break to the shorter text, as the contest does). The program writes the winner to `/output/entry.txt`, re-reads it, and validates the gate exactly — UTF-8, 1–140 characters, non-blank, exactly one line — failing loudly on any violation.

Run it with:

```
node main.ts
```
