---
name: kanri-fee-goto-exceed
description: Create and verify Goto/Exceed monitoring-fee invoice workbooks using the dedicated .xlsm template, preserving macros and the template's merged-cell layout. Use for ごとう・Exceed専用監理費請求書の作成・修正.
---

# kanri-fee-goto-exceed

ごとう/Exceed専用。JCPS・BKUのテンプレート、セル位置、数式、タブ命名を流用しない。

## Files

- Source: `240229 監理費 重要.xlsx`
- Trainee source: `Trainee元気ですか のコピー.xlsx`
- Template asset: `C:\Users\USER\.codex\skills\bku-recipe-library-main\skills\kanri-fee-goto-exceed\assets\監理費請求書_空テンプレート_ごとうExceed.xlsm`

If the asset is missing, stop and ask for the original `24xxxx 監理費 【ごとう, exceed】_MOE style_ あとUMC.xlsm`; never use a JCPS/BKU template as a substitute.

## Grouping and tab names

- Filter groups whose applicable `NEXT` date is in the requested month and route only the Goto/Exceed cooperative records here.
- Combine all matching groups for the same cooperative into one invoice tab.
- Use the same tab naming convention as JCPS: `YYMMNN 組合名`, where `NN` is the sequence by ascending applicable date. For October 2026 Exceed, use `261001 Exceed事業協同組合`.
- Preserve official Japanese cooperative/company names, including kanji, katakana, and hiragana.

## Source mapping

- End date: the source cell immediately left of the row's `NEXT` status cell.
- Round: numeric value in row 4, one column left of that same `NEXT` column; render `<number>回目`. Never hard-code a round.
- Period start: source date three columns left of `NEXT`; source exceptions override the normal six-month pattern.
- Include `入国日：YYYY/MM/DD` in the period text.
- Headcount: search the complete Group name, including parentheses, for every `数字pax`; use the final occurrence. `5pax 1期生 以後3pax` means 3. An explicit user-confirmed count overrides parsing.
- October 2026 Exceed override: use 9 for m116 when applying the user-provided invoice reference, even though its Group name ends in `10pax`; calculate that line at `6×9×10,000` and the three-line total as 1,500,000円.

## Trainees and summary

- Read names from the matching `mNNN` sheet in `Trainee元気ですか のコピー.xlsx`.
- Exclude any trainee whose name cell has any fill/background color. Font color alone is irrelevant.
- 摘要: use the Japanese company/group name only; do not display English company names or `数字pax` text.
- Display the Japanese company/group name on the first line and eligible trainee names on later lines using a real Excel in-cell line break (`CHAR(10)`/line-feed) with WrapText enabled.
- Never invent, translate, or include filled trainee names.

## XLSM handling

- Always copy the blank `.xlsm` asset to a new output file.
- Match the user-provided approved workbook layout for the lower payment area: primary bank details on the left (`C20:E29`), alternative bank details on the right (`I20:K25`), closing line at `I27`, and the original signature/stamp at `I28`. Keep the left account values in `E21:G25` by merging `E21:G21` through `E25:G25` row by row, with each value in the merged area's top-left cell. This prevents long text from spilling across the one-column blank gap `H20:H29`; keep the alternative block beginning at `I20`. Do not substitute a widened separator or a vertical border for the blank H column. Do not leave duplicate alternative-bank labels in `C32:C37`. Preserve the signature image's aspect ratio and use the reference workbook's lower-area widths, row heights, and placement.
- Preserve VBA project, macros, sheet protection behavior, merged cells, formatting, print settings, and formulas.
- Inspect the actual blank asset for recipient, date, number, detail, total, and period cells before writing. Write to merged-area top-left cells only.
- Confirmed Goto/Exceed cells: write the Japanese cooperative name to `B3`; write the requested billing month as `YYYY/MM/01` to `H4`.
- In this template, the JCPS `摘要` equivalent is the `氏名` column. Write the Japanese company/group description followed by eligible trainee names there, using in-cell line breaks.
- 氏名欄の表示形式: 1行目は日本語会社名のみ（`K20`等のGroup IDは表示しない）、2行目以降は実習生名。英語会社名は表示しない。
- 請求期間欄は、JCPSの「期間」に相当する。`<number>回目`、`入国日：YYYY/MM/DD`、開始日、終了日を日本語で入力する。`round`や`entry`など英語ラベルは使用しない。
- 単価の例外: 宛名・組合名が`Exceed事業協同組合`の場合は、単価を10,000円として明細金額と合計を計算する。他の組合にはこの例外を適用しない。
- 明細金額: `期間（月数）×人数×単価`。Exceed事業協同組合の2026/10分は `6×人数×10,000` とする。
- Clear copied historical values/formulas before input; never start from a historical invoice.

## Required visual layout (match the approved Screenshot 2 or user-provided workbook reference)

- Use the larger, centered invoice composition shown in the approved reference: keep the header/logo area centered, place the billing amount box centered above the detail table, and make the detail table occupy the wider middle-page area. Do not preserve the compressed, narrow, left-shifted composition shown in the old format.
- Keep the detail table vertically aligned beneath the amount box. The table must have the approved wide column proportions so the Japanese company/group description and trainee names remain readable, while the period, headcount, unit price, and amount columns remain distinct and do not crowd into one another.
- Keep the Japanese company/group description and trainee names inside the 氏名 column, with the company/group name on the first line and each eligible trainee on a later line. Preserve real in-cell line breaks and WrapText; do not replace them with spaces or a single long unwrapped line.
- Below the table, render the payment/bank information as two side-by-side blocks: the invoice/addressee or billing-side information on the left and the payment-recipient/bank information on the right, matching the approved Screenshot 2 arrangement. Leave exactly column H visibly blank between them in rows 20–29, including when long account text is displayed. Do not stack all bank details into one narrow left-side block.
- Keep the signature/stamp block at the lower-right of the invoice, beneath the right-side information block, matching Screenshot 2. Do not leave the signature at the lower-left as in the old format. Preserve the original signature image/stamp and its aspect ratio.
- Keep the total row inside the table and aligned with the amount column. The table, total, two information blocks, and signature must fit on the same printed page without clipping, overlap, or excessive unused space.
- Visual QA must compare the reopened output against the approved Screenshot 2 or the user's supplied workbook reference: centered/wider table, two-column lower information area, and lower-right signature. A workbook that is numerically correct but does not match the supplied visual reference fails verification and must be corrected before delivery.

## Verification

- For November 2026, use the same sequence rule with the `2611NN` prefix; do not reuse the October-specific example. Determine the period from the row's actual `NEXT` cell, and verify the reopened workbook before delivery.

After saving, close Excel and reopen the `.xlsm` output. Verify recipient, invoice date/number, round, entry date, start/end dates, final-pax headcount, filled-name exclusion, Japanese-only summary, in-cell line breaks, formulas, totals, and the visible blank H-column gap between the payment blocks, with no stale data, mojibake, `#VALUE!`, or `#REF!`. If any template cell location or source mapping is ambiguous, stop and ask instead of guessing.

## Excel-side direct extraction

- Use Excel itself as the source of truth for IDs, company names, cooperative names, entry dates, group names, trainee sheet names, trainee names, and fill/background state. Do not parse these Japanese or full-width values through PowerShell text files or encoded intermediate output.
- Match IDs after normalizing only the ASCII/full-width `m` prefix (`ｍ122` and `m122` refer to the same source ID); preserve all other source text exactly.
- Read `Interior.ColorIndex`/`Interior.Color` directly from each trainee name cell. Any non-no-fill state excludes the trainee.
- Write values through Excel Range/Cells APIs, writing merged-area top-left cells only. Use Excel-native `CHAR(10)` or a verified line-feed for in-cell line breaks.
- Save and reopen the `.xlsm` through Excel before reporting completion. If a value changes after reopen, treat the output as failed and do not deliver it.
