# Recipe reference

## Inputs and mappings

Use the `Final Excel List` workbook whose filename begins with the group name for furigana. If `12 技能実習生の履歴書ver2012*.pptx` is absent, leave 本国の居住地 and 職歴 blank and do not infer them from other documents.

- Passport PDF/image: 氏名, 性別, 生年月日, 出生地, 国籍, パスポートNo., パスポート期限.
- Final Excel List.xlsx: フリガナ. Prefer the project/group Final sheet; otherwise use a sheet containing both 名前 and フリガナ. Match passport English name after trimming spaces and ignoring case.
- `12 技能実習生の履歴書ver2012*.pptx`: 本国の居住地 and 職歴. Exclude school/college/university history from 職歴.

## Fixed values and blanks

- No.: one applicant `1`; multiple applicants `01`, `02`, ... in person-folder order.
- Gender: passport `F` → `女`; `M` → `男`.
- Dates: `YYYY/MM/DD`.
- 職業: blank.
- 配偶者: `無`.
- 査証申請予定地: `YANGON`.
- 過去の出入国回数: `0`.
- 過去の在留資格認定証明書交付申請回数: `0`.
- うち不交付となった回数: blank.
- 犯罪を理由とする処分歴の有無: `無`.
- 有の場合の具体的な犯罪処分: blank.
- 退去強制または出国命令による出国の有無: `無`.
- 回数（退去強制または出国命令）: blank.
- 直近の送還歴: blank.
- 在日親族: `無`.

## Layout and output

- 固定テンプレートは使用しない。同梱の `assets/完成見本.xlsx` を読み取り、構造・列・結合・罫線・色・行高・数式・シート構成を完成基準として再現する。完成見本そのものを直接上書きしない。
- 人数が完成見本の行数を超える場合は、最後の申請者行を行単位で複製して下へ追加する。列ごとの書式・塗りつぶし・罫線・フォント・数式・行高をすべて維持し、1セルの書式だけを流用して新規行を作らない。
- 追加行の作成後は、A:ACの全セルを申請者ごとに再確認する。氏名・フリガナ・性別・配偶者・パスポート情報・固定既定値・職歴を確認し、明示的な空欄ルールがない項目の欠落を残さない。
- Preserve the approved template's columns, rows, merges, fonts, fills, formulas, and normal data-row heights.
- Sheet name: project/Final Excel List beginning with `K` or `N` → `技能実習生履歴書リスト`; beginning with `T` → `特定履歴書リスト`.
- Preserve yellow cells and orange cells. For fields without a rule, leave blank and use the template's red-cell convention when applicable; do not add colors based on guesswork.
- Save to the project folder. Output filename is the Final Excel List filename with `Final Excel List` replaced by `合格者　履歴書リスト`.

## Employment history

Extract company/facility name and start/end year-month from the resume. Sort oldest to newest. Use `YYYY/MM~YYYY/MM`; for current employment use the source's confirmed current notation. Place entries in the approved career columns/slots and leave unused slots blank. Do not mix company names with periods or include education.

## Final checklist

- Name, furigana, birth date, passport number, and expiry match source material.
- Address comes from the resume; nationality and birthplace come from the passport.
- No education appears in career history; careers are oldest-first.
- Blank/`0`/`無` usage is exact.
- Sheet name, filename, yellow/orange fills, row heights, and workbook readability are correct.
