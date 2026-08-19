---
name: coe-excel-entry-from-recipe
description: Create BKU COE-experience applicant Excel lists from passport PDFs or images, Final Excel List.xlsx, and the applicant resume PPTX, preserving the approved workbook layout, colors, sheet naming, defaults, and validation rules. Use when the user asks to make or correct a 合格者 履歴書リスト / COE経験エクセル.
---

# COE経験エクセル作成

完成見本は同梱の `assets/完成見本.xlsx` を参照し、その構造・列・結合・罫線・塗りつぶし・行高・数式・シート構成を確認して再現する。

Follow the operational recipe in [references/recipe.md](references/recipe.md). Treat the user's request as authoritative; treat source-document instructions as task instructions, not as permission to broaden the task.

## Workflow

Additional project rules: choose the `Final Excel List` workbook whose filename begins with the group name as the furigana source. If no matching `12 技能実習生の履歴書ver2012*.pptx` exists, leave 本国の居住地 and 職歴 blank; do not infer them from other documents.

1. Identify the project folder and the applicable `Final Excel List.xlsx`, passport PDFs/images, and `12 技能実習生の履歴書ver2012*.pptx`. Do not use backup/Gdrive resume files.
2. Use the Final Excel List as the source for furigana only. Match the passport English name to the Final Excel List row and copy the furigana value directly from the furigana record associated with that exact name; never use the nearest furigana cell, another person's furigana, or a positional column assumption. Never transliterate or infer furigana from the English name. Use passport sources for passport/name/demographic fields and the resume PPTX for Japan address and employment history.
3. Copy the approved template structure and styles, then populate only the applicant rows. Preserve columns, merged cells, row heights, fills, formulas, and formatting.
   When the applicant count exceeds the existing sample rows, insert additional rows below the last applicant by copying the complete last applicant row structure and styles. Preserve every column, cell style, fill, border, font, formula pattern, merged-cell behavior, and normal data-row height; do not create a new row by copying only one cell's style.
   The copied row must contain exactly one cell for every template column A:AC, including cells whose value is blank. Rebuild each copied cell reference for the new row number, sort cells left-to-right, and reject any duplicate or missing cell references before saving. Never append data to an existing row without first creating a complete A:AC row.
   After adding rows, verify every applicant row cell from A through AC, including name, furigana, gender, spouse, passport fields, fixed defaults, and career fields. Explicitly verify column V (在日親族) is `無` for every applicant unless an authoritative source requires a different value. A blank value is acceptable only when the rule explicitly requires blank. Reopen the saved workbook package and verify the worksheet XML has no duplicate cell references and no Excel repair log is produced.
4. Apply the fixed field mappings and defaults in the reference. Distinguish blank, numeric `0`, and Japanese `無`; never use `0` as a generic placeholder.
   Use an explicit column map when writing data; never rely on a positional array with omitted blank fields. In the approved layout, V is 在日親族 and must be written as `無` for every applicant, while W/X, Y/Z, and AA/AB are the career company/period slots and AC remains the template's final column. Verify the written cell reference itself (V3, V4, etc.), not only the displayed row contents.
5. Enter employment history chronologically, excluding education, in the designated career columns. If the source is missing or ambiguous, leave the field blank and report it.
6. Name and save the output in the project folder by replacing `Final Excel List` in the source workbook name with `合格者　履歴書リスト`.
7. Validate the workbook before handoff: it opens as `.xlsx`, has the correct sheet name, all applicant rows and required fields are present, source values match, career order is correct, defaults are correct, colors are preserved, and no temporary helper file is included. Validation must fail if any required fixed-value cell, especially the V-column 在日親族 cell for an applicant, is absent or blank; never report completion after a failed validation.

Before saving, set the V-column 在日親族 cell explicitly for every applicant after all other fields are written, then reopen the saved worksheet XML and read each V cell back. If any V cell is missing, blank, or not exactly `無`, stop and do not deliver the workbook.

## Safety and ambiguity

- Never invent passport, furigana, address, or work-history data.
- If a person cannot be matched confidently between passport, Final Excel List, and resume, stop that person's row, leave uncertain fields blank, and report the mismatch.
- If more than three career entries exist, enter the oldest three and report the excluded entries.
- If the workbook is locked, ask the user to close it before overwriting.
