---
name: folder-aware-student-validator
description: Validate copied student-document folders locally and create one consolidated Excel workbook. Use when checking Training Visa or Tokutei Visa student folders for required documents, passport expiry, medical FIT/UNFIT, certificate presence, and student-name consistency without accessing Google Drive.
metadata:
  short-description: Validate local student folders into one Excel report
---

# Folder-Aware Student Validator

Use this skill when the user copies a job folder or student folder into the local `BKU test` workspace and wants a document-completeness report.

## Scope and privacy

- Scan only the local folder explicitly provided by the user. Do not connect to or request full Google Drive access.
- Preserve the original files. The output is a consolidated workbook with one row per checked student.
- A job folder is typically `Job folder -> Student folder -> documents`. If a single student folder is supplied, create one row.

## Rules

Training Visa requires Family Document, Passport, NRC, Medical Check-up, and at least one of JLPT, NAT-Test, or JFT.

Tokutei Visa requires the same documents plus Tokutei Certificate.

Do not require expiry dates for Medical Check-up, JLPT, NAT-Test, JFT, or Tokutei Certificate. Check passport expiry only. Report medical status as FIT or UNFIT. Check names inside the passport, medical document, language certificate, Tokutei certificate, and Family Document against the student folder name; use `Review` when the content is unreadable or conflicts.

## Document inspection

- Prefer reading PDF/DOCX text when available.
- For scanned/image-only PDFs, render relevant pages and inspect them visually. Do not infer an expiry date or medical result from a filename.
- Record `Manual review` when the required fact cannot be read confidently.
- Treat extra forms and duplicate documents as review warnings, not missing requirements.

## Output workbook

Create one workbook named `Folder-Aware Student Data Validator.xlsx` with these sheets:

- `Control / 操作`: source folder, visa type, counts, and rules summary.
- `Validation Results / 検証結果`: one row per student, including Student Folder, Visa Type, Status, Missing Documents, Family Document status, Passport Expiry, Medical Result, JLPT/NAT/JFT Result, Tokutei Certificate Result, Student-name Consistency, Files Scanned, and Checked At.
- `Config / 設定`: editable required-document and checking rules.
- `Run Log / 実行履歴`: source folder, run time, and student count.
- `Checked Folder List / 確認済みフォルダ一覧`: append-only history of every checked source folder, check time, student count, missing-data count, and overall status. Keep `outputs/folder-aware-validator/checked_folders.json` beside the workbook so future runs can append history.

Use the spreadsheet skill for workbook authoring and visual verification. When creating or editing the workbook, render all sheets and scan for formula errors before delivery.

## Reusable helper

Use `scripts/run_job_validator.mjs` as the starting point for local batch scans. Adapt its source-folder argument and content facts only when the document inspection requires human review.

