---
name: pre-entry-training-schedule-generator
description: Create Japanese 技能実習生 入国前講習実施記録（参考様式第４-８号）from group documents, preserving the approved pre-entry training plan’s subjects and hours.
---

# 入国前講習実施記録作成

Create the completed `入国前講習実施記録` Word document from the approved group documents. `入国前講習実施（予定）表` is the source of truth for the schedule; never invent, equalize, or otherwise recalculate subject-hour allocations.

## Read from the project folder

When asked to create a record from a project folder, locate and read the relevant group’s common-scan folder, typically named `Facephotoと個人共通scan`. Do not require the user to identify individual files.

- Read the training period, subjects, sequence, and planned hours from `共通` > `入国前講習実施（予定）表`.
- Read the monitoring organization name and responsible manager name from `入国前講習実施（予定）表に関する申請者等の誓約書`. If the responsible manager's name cannot be read, use the bundled `assets/kumiai-list.pdf` reference, match the monitoring organization name to the corresponding row, and use its `CEO Name (Jap)`. When using the fallback, enter the name as `代表取締役　[CEO Name (Jap)]`.
- Read trainee names from `共通` > `技能実習生の推薦状` (Letter of recommendation for technical intern trainees). Use the names in this document as the group’s trainee list.
- Determine whether the group is a nursing-care case when either of the following is true: `介護` appears below the trainee's name in `技能実習生の推薦状`, or `参考様式第３号` exists in the group’s common scan.
- For a nursing-care case, replace the broad `日本語（会話、読み書き）` entry from `参考様式第１-29号` with the detailed subject names, order, and planned hours from `参考様式第３号` section `１ 日本語科目`. Include `介護の日本語` whenever it is listed, without omitting or renaming it.
- For a nursing-care case, also retain `本邦での生活一般に関する知識` from `参考様式第１-29号` with its stated hours, and retain `本邦での円滑な技能等の修得等に資する知識` as a subject from `参考様式第１-29号` with its stated hours even when `参考様式第３号` has no internal breakdown for that category. Do not invent sub-subjects or internal hour allocations for it.
- Do not perform a separate total-hours reconciliation for nursing-care classification or subject extraction.
- For a non-nursing-care case, read the subject names, sequence, and planned hours from `共通` > `入国前講習実施（予定）表` as usual.
- Require the user to provide the entry date for every group, even if an older document contains another entry date. Never infer or reuse it.
- Treat the user-provided entry date as group-specific input and use it for implementation-period handling and the appendix; do not extract or reuse an entry date from a prior record.
- If the planned schedule table, pledge, or trainee folders cannot be found or read, list the missing source and stop before generating the document.

## Scheduling rules

- Schedule Monday-Friday only; exclude Saturdays, Sundays, and official Myanmar public holidays for every year covered. Verify or obtain the year-specific official holiday dates; do not infer lunar holidays.
- Use `9:00 ～ 17:00`, `Christi`, and `BKU Co., Ltd` unless the approved plan or user specifies different values.
- Preserve every subject, sequence, and total hour count from the planned schedule. Do not use an eight-subject/equal-40-hour default.
- First build the schedule from the subjects and planned hours in `参考様式第１-29号` (or the applicable detailed nursing-care source), without changing the approved hour allocations.
- Use the period written in `参考様式第１-29号` as the planning window, applying the existing six-month adjustment only when its start date is earlier than the calendar date six months before entry. To avoid unnecessary page-count growth, schedule the planned hours in the shortest possible number of Monday-Friday class days within that window, while preserving subject order and total hours. Use the standard 9:00-17:00 class window unless the user specifies another time; adjust the final day's hours as needed to complete the planned hours exactly. Do not spread classes across the full planning window just to reach its source end date, and do not apply a three-week-before-entry end-date rule.
- Represent each calendar day as one attendance-table row. If the subject changes during the day, keep the time column as the day's full time window and list each subject with its internal time range in the subject cell.
- Do not include `(9:00 ～ 17:00)` or equivalent full-day time text in standard `科目（内容）`/Subject column entries. Only include each subject's duration in the Subject column when multiple subjects are covered on the same day; in that case, list each subject with its internal time range while keeping the time column as the day's full time window.
- If the scheduled start date falls on a Saturday, Sunday, or excluded public holiday, set the actual first class date to the next available teaching day.
- In the completed `入国前講習実施記録`, write `実施期間` using the actual first scheduled class date through the actual last scheduled class date. Do not copy an unused later end date from the planning window.
- Implementation-period rule:
  - First use the period written in `参考様式第１-29号` as the approved period.
  - If the approved period's start date is earlier than the calendar date six months before entry, move the course start date to the calendar date six months before entry and move the course end date later by the same number of calendar days. The adjusted order is: adjusted course start at entry-date-minus-six-months, adjusted course end, entry.
  - Do not start every group automatically six months before entry. Change the approved period only when its start date is earlier than entry-date-minus-six-months.
  - If the source period or entry date makes the case unclear, stop and ask the user before generating.

## Output fidelity

- Copy the approved reference DOCX and preserve its page layout, table formatting, pagination, and appendix.
- Replace the monitoring organization name, responsible manager name, training period, schedule values, trainee names, and entry date(s).
- For a one-person group, leave all other trainee-list rows blank.
- Before delivery, confirm that the selected subject names, order, and hours came from the applicable source document, that care cases include the detailed Japanese subjects and the required broad categories, and that no reference-group details remain. Mention the major excluded holidays.

