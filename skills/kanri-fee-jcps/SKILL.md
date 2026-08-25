---
name: kanri-fee-jcps
description: Create and verify JCPS monitoring-fee invoice Excel workbooks from 240229 source data, the Trainee workbook, and the approved JCPS blank template. Use for 日本企業振興協同組合監理費請求書作成・修正.
---

# kanri-fee-jcps

JCPS専用。BKU・ごとう/Exceedのテンプレートやセル位置を流用しない。

## Files

- Source: `240229 監理費 重要.xlsx`
- Trainee source: `Trainee元気ですか のコピー.xlsx`
- Template: `C:\Users\acer\.codex\skills\monitoring-fee-invoice\assets\監理費請求書_空テンプレート_JCPS.xlsx`

## Rules

- Filter rows whose applicable `NEXT` date is in the requested month.
- Combine all matching JCPS groups into one invoice tab.
- Tab name: `YYMMNN 日本企業振興`; `NN` is the sequence by ascending applicable date. September 2026 is `260901 日本企業振興`.
- Use the official Japanese cooperative name in the recipient field.
- End date: source cell immediately left of the row's `NEXT` status.
- Round: numeric value in row 4, one column left of that same `NEXT` column; render `<number>回目`. Never hard-code `1回目`.
- Period start: source date three columns left of `NEXT`; source exceptions override the normal six-month pattern.
- Leave the detail `取引日` cells blank. In the period column, use exactly `<number>回目\n入国日YYYY/MM/DD\n\nYYYY/MM/DD-YYYY/MM/DD` (no colon after `入国日`). Display the six-month period immediately preceding the current source period: it ends on the source period start and begins six months earlier; source exceptions override the normal six-month pattern.
- Headcount: search the complete Group name, including parentheses, for every `数字pax`; use the final occurrence. `5pax 1期生 以後3pax` means 3. An explicit user-confirmed count overrides parsing.
- Unit price: charge ¥5,000 per trainee per month unless the user explicitly provides a different rate.
- 摘要C列: Japanese company/group description and eligible trainee names only. Do not display English company names or any `数字pax` text.
- 摘要C列の表示形式: 1行目に日本語会社名・グループ名、2行目以降に実習生名をセル内改行で表示する。会社名と実習生名を同じ行に連結しない。

## Trainees

- Read names from the matching `mNNN` sheet in `Trainee元気ですか のコピー.xlsx`.
- Exclude any name cell with any fill/background color. Font color alone is irrelevant.
- Never invent or translate names.

## JCPS template handling

- Always copy the blank JCPS asset; never start from a historical invoice.
- Inspect merged areas and write each field to the correct merged area's top-left cell.
- Recipient must be written to the actual JCPS recipient cell.
- In the JCPS template, write the cooperative recipient to `B3`. Preserve the template labels `請求日` in `H3` and `請求書番号` in `H4`; write the invoice date as `yyyy/mm/dd` to `K3` and the invoice number to `K4`, with K3/K4 right-aligned.
- For September 2026 use invoice date `2026/09/01` and invoice number `INV-2609`.
- Clear row 15's historical values/formulas; do not leave a stale total there.
- Preserve the JCPS layout, formulas, borders, and number formats.
- Preserve the blank-template total formula in `K30` (`=SUM(K20:K23)`); after populating details, verify that K30 remains a formula and equals the detail total.

## Verification

After saving, close and reopen the workbook and verify recipient, blank transaction-date cells, round, entry date, displayed prior six-month period, final-pax headcount, excluded filled names, blank row 15, formulas, totals, and absence of `#VALUE!`, `#REF!`, mojibake, stale rows, and stale historical amounts. If any source cell or mapping is ambiguous, stop and ask instead of guessing.

