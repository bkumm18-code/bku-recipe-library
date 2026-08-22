---
name: kanri-fee-most
description: Create and correct BKU monitoring-fee invoice workbooks from the 240229 source, Trainee workbook, and dedicated BKU blank template. Use for BKU-specific cooperative grouping, tab sequencing, invoice headers, trainee filtering, periods, headcounts, formulas, and Excel verification.
---

# kanri-fee-most

Create BKU monitoring-fee invoices only. Do not substitute the JCPS or Goto/Exceed templates.

## Required files

- Source workbook: the workspace file matching `240229*`.
- Trainee workbook: the workspace file matching `Trainee*`.
- Approved blank template: the `.xlsx` asset in this skill's `assets` directory.
- Always copy the blank asset for a new run. Never modify the approved asset or start from a historical invoice.

## Excel execution and text safety

- Use Excel COM as the primary method; VBA is the fallback.
- Read IDs, Japanese company/cooperative names, group names, dates, formulas, trainee names, and fill state directly from Excel objects.
- Do not embed Japanese source values in PowerShell scripts or serialize them through text/intermediate files. This includes worksheet names. Build Japanese worksheet names from source workbook cell values.
- Normalize only the ASCII/full-width `m` prefix when matching IDs; compare the numeric portion and preserve displayed source text.
- Save, close, and reopen the output in Excel before delivery. Compare displayed Japanese sheet names and key values after reopening. A mojibake sheet name is a failed output.

## Scope and grouping

- Include only rows whose applicable `NEXT` date is in the requested month.
- Skip rows without a valid `NEXT` cell before reading round/start/end columns.
- Route only BKU-managed cooperatives; exclude JCPS and Goto/Exceed records.
- Combine all matching groups for one cooperative into one invoice tab, even when their applicable dates differ.
- Sequence cooperatives by ascending earliest applicable `NEXT` date: `01`, `02`, `03`...

## Tab names and order

- Tab name format: `YYMMNN cooperative-name`.
- `YYMM` is the requested year/month; `NN` is the cooperative sequence, not the literal NEXT calendar day.
- Example for October 2026: `261001`, `261002`, `261003`...
- Remove the suffix `協同組合` and adjacent spaces from the displayed cooperative name; preserve the remaining official Japanese text.
- Order tabs left-to-right by sequence descending: `...03`, `...02`, `...01`. Thus the earliest cooperative is the rightmost tab.
- Keep sheet names within Excel's 31-character limit using deterministic Japanese-safe shortening only when required.

## Recipient and invoice header

- Write the official Japanese cooperative name to the template recipient cell.
- Invoice date follows the tab prefix sequence: `261001` -> `2026/10/01`, `261002` -> `2026/10/02`, `261003` -> `2026/10/03`.
- Invoice number is `INV-` plus the six-digit tab prefix: `INV-261001`, `INV-261002`, `INV-261003`.
- Preserve the template's date/number labels and write values to the template's designated value cells.

## Detail source mapping

- Read date cells from their underlying Excel value (`Value2`) and format them as `yyyy/MM/dd`; do not trust `.Text` when the source column is too narrow, because Excel may return `########`.
- End date: source cell immediately left of the row's `NEXT` cell.
- Period start: source cell three columns left of that `NEXT` cell. Source exceptions override calculated dates.
- Round: numeric value in row 4, one column left of the same `NEXT` cell. Render as an integer followed by `回目`; never `2.00回目` or `回目回目`.
- Period field includes the round, `入国日：YYYY/MM/DD`, and `start-date-end-date`.
- Headcount: find every `number + pax` occurrence in the complete Group name, including parentheses/brackets, and use the final occurrence. A user-confirmed count overrides parsing.

## Summary and trainees

- Summary first line: Japanese company name from the source company column only. Do not include Group-name text, English company names, IDs, or pax text.
- Later lines: eligible trainee names from the matching `mNNN` worksheet, separated with real Excel line feeds; enable WrapText.
- Read candidate names from column A cells whose displayed text begins with a numeric sequence such as `01 `.
- Include only cells with `Interior.ColorIndex = -4142` (no fill). Exclude every filled/background-colored name cell; font color alone does not exclude a name.
- Never invent or translate names.

## Detail rows, formatting, and formulas

- Inspect the blank template's actual merged areas and write only to merged-area top-left cells.
- Set every populated or formula-bearing cell in the detail fields from Summary through Detail Amount (`C:K`, standard rows `21:35`) to font `ＭＳ ゴシック`, size `9 pt`. This applies to Summary, Period, Quantity (months), Headcount, Unit Price, and Detail Amount.
- Clear copied/stale detail contents before writing. Clear each merged area separately.
- After filtering, clear summary, period, quantity, headcount, unit price, and amount values/formulas from every unused detail row. Do not leave values from another cooperative.
- Copy only formatting from the preceding populated detail row to the final populated row when needed; do not copy values or formulas.
- Preserve the template quantity/unit-price convention and set each detail amount formula from that row's quantity, headcount, and unit-price cells.

## BKU totals

- `K37` is the detail subtotal and must contain `=SUM(K21:K35)` in the standard layout.
- `E15` is the invoice amount and must contain `=K37`.
- `K30` must be blank.
- `K15` must be blank. Never use K15 as the invoice amount.

## Final verification

After reopening the saved workbook, verify every tab:

- Japanese tab name, six-digit prefix, descending tab order, recipient, invoice date, and invoice number.
- Correct cooperative grouping with no rows or numeric remnants from other cooperatives.
- Japanese-only company summary, eligible trainee names, integer round, entry/start/end dates, final-pax headcount, and line breaks.
- Detail formulas, `K37`, `E15`, blank `K30`, blank `K15`, and correct totals.
- Font `ＭＳ ゴシック`, size `9 pt`, across Summary, Period, Quantity, Headcount, Unit Price, and Detail Amount cells.
- No mojibake, stale rows, `#VALUE!`, or `#REF!`.

Do not deliver the workbook when reopen validation differs from what was written.
