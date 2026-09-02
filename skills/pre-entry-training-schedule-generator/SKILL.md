---
name: pre-entry-training-schedule-generator
description: Create Japanese 技能実習生 入国前講習実施記録（参考様式第４-８号）from group documents, preserving the approved pre-entry training plan’s subjects and hours.
---

# 入国前講習実施記録作成

Create the completed `入国前講習実施記録` Word document from the approved group documents. `入国前講習実施（予定）表` is the source of truth for the schedule; never invent, equalize, or otherwise recalculate subject-hour allocations.

## Read from the project folder

When asked to create a record from a project folder, locate and read the relevant group’s common-scan folder, typically named `Facephotoと個人共通scan`. Do not require the user to identify individual files.

- Read the training period, subjects, sequence, and planned hours from `共通` > `入国前講習実施（予定）表`.
- Read the monitoring organization name and responsible manager name from `入国前講習実施（予定）表に関する申請者等の誓約書`.
- Read trainee names from `共通` > `技能実習生の推薦状` (Letter of recommendation for technical intern trainees). Use the names in this document as the group’s trainee list.
- Require the user to provide the entry date for every group, even if an older document contains another entry date. Never infer or reuse it.
- Treat the user-provided entry date as group-specific input and use it only for the six-month validation and the appendix; do not extract or reuse an entry date from a prior record.
- If the planned schedule table, pledge, or trainee folders cannot be found or read, list the missing source and stop before generating the document.

## Scheduling rules

- Schedule Monday-Friday only; exclude Saturdays, Sundays, and official Myanmar public holidays for every year covered. Verify or obtain the year-specific official holiday dates; do not infer lunar holidays.
- Use `9:00 ～ 17:00`, `Christi`, and `BKU Co., Ltd` unless the approved plan or user specifies different values.
- Preserve every subject, sequence, and total hour count from the planned schedule. Do not use an eight-subject/equal-40-hour default.
- Official rule: the course start date must be at least six months before the entry date, meaning it must be on or before the calendar date six months before entry. For example, with entry on 2026/09/04, the start date must be 2026/03/04 or earlier. If this condition fails, stop and ask the user to confirm or correct the dates.

## Output fidelity

- Copy the approved reference DOCX and preserve its page layout, table formatting, pagination, and appendix.
- Replace the monitoring organization name, responsible manager name, training period, schedule values, trainee names, and entry date(s).
- For a one-person group, leave all other trainee-list rows blank.
- Before delivery, compare resulting subject totals with the planned schedule and confirm that no reference-group details remain. Mention the major excluded holidays.

