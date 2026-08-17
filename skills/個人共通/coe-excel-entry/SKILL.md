---
name: coe-excel-entry
description: Create passport-information Excel documents from passport PDFs or images using approved BKU formats, fixed field mappings, defaults, multi-person ordering, local Final Excel List furigana lookup, trainee-resume address and work-history extraction, precise fill-color rules, and output naming rules. Use for new passport lists and corrections.
---

## Operational corrections and mandatory safeguards

- Always inspect the complete template column range before writing. Do not limit processing to the visibly populated first columns; fields from O through AC are part of the approved layout.
- The output filename is exactly: `<project folder name with leading date removed> 合格者　履歴書リスト.xlsx`. Preserve the project folder name; do not replace `2pax` with `3pax` merely because the number of actual applicants changed. Use the exact full-width space in `合格者　履歴書リスト`.
- The output worksheet/tab name must be `技能実習生履歴書リスト`.
- Worksheet/tab naming rule based on the Final Excel List project name: if the project name starts with `K` or `N`, use `技能実習生履歴書リスト`; if it starts with `T`, use `特定履歴書リスト`. This rule takes precedence over a generic default tab name.
- Input-cell font must be `Calibri`, size `10`, for every populated applicant row and every populated input cell. Apply this after copying template styles.
- Preserve only fills already specified by the approved template/rules. Never add a fill based on an assistant judgment. In particular, do not color arbitrary career cells; restore styles from the template and verify fills before saving.
- Separate default values into three categories before entry: numeric zero, Japanese `無`, and blank. Enter `0` only in fields whose rule explicitly requires zero. Keep fields explicitly defined as blank empty. Do not use `0` as a generic placeholder.
- Current confirmed blank rules: `うち不交付となった回数` and `回数` must remain blank when the applicable rule says blank. Current confirmed defaults include `過去の出入国回数=0`, `過去の在留資格認定証明書交付申請回数=0`, `犯罪を理由とする処分歴の有無=無`, `退去強制または出国命令による出国の有無=無`, and `在日親族=無`; resolve any conflicting source instruction in favor of the explicit current project instruction.
- Career history must be written to the designated career columns W:AB in chronological order, excluding education. Use `YYYY/MM~YYYY/MM` and leave unused career slots blank.
- Before final handoff, verify: exact filename, exact tab name, all applicant rows, all required fields through AC, zero-versus-blank rules, font name/size, fills, workbook readability, and that no unintended temporary helper file is included. If the workbook is locked, stop and ask the user to close it before overwriting.
- Row-height rule: all applicant data rows must use the normal/default data-row height. Do not leave No.1 or any individual applicant row with an enlarged height caused by copied template sizing, AutoFit, or manual edits. Verify every applicant row height before final handoff.

# COE Excel Entry

パスポートPDFまたは画像から、BKU指定の履歴書リストExcelを作成・修正する。

## 入力の探し方

- ユーザーが指定した新しいプロジェクトフォルダー内を検索する。
- 各人物フォルダー内のパスポートPDFまたは画像を使用する。
- 本国住所と職歴には、各人物フォルダー直下の `12 技能実習生の履歴書ver2012*.pptx` を使用する。
- フリガナ参照用の `Final Excel List.xlsx` を除き、フォルダー内の既存Excelを人物情報の参照元にしない。
- `ゴミ` フォルダー内の履歴書は使用しない。
- 複数名の場合は、人物フォルダー名の先頭にある `01`、`02`…の順に並べる。

## Excel様式

- BKUの承認済みテンプレートまたは `assets/multi-person-template.xlsx` を基に作成する。
- 元のセル結合、列幅、行高、罫線、フォント、配置、印刷設定、数式を維持する。
- 既存の他人のデータ行は削除し、対象者だけを残す。
- 対象者が1名なら No. は `1`。複数名なら同じワークシート内で `1`、`2`…と連番にする。
- 職業欄（G列）は、見出し行・説明行・対象者行を `#F4B083`（RGB 244,176,131）で塗りつぶす。
- 「犯罪を理由とする処分歴の有無」から「直近の送還歴」まで（Q～U列）は、見出し行・説明行・対象者行を `#F4B083`（RGB 244,176,131）で塗りつぶす。
- 在日親族欄（V列）およびテンプレート上のその他の黄色指定欄は黄色 `#FFFF00` を維持する。

## 出力先とファイル名

- 完成した `.xlsx` は、現在のワークスペースである「個人共通」フォルダー直下に保存する。
- プロジェクトフォルダー名の先頭の日付6桁（例: `260724`）を除く。
- 出力名は `<日付を除いたプロジェクトフォルダー名> 合格者　履歴書リスト.xlsx` とする。
- 拡張子のないファイルや、Excelとして開けないファイルを作らない。

## 項目ルール

- No.: 1名なら `1`、複数名なら `01`、`02`…の人物順に `1`、`2`…。
- 氏名: パスポートの英字氏名。
- フリガナ: 下記「フリガナの取得」ルールに従う。
- 性別: パスポートが `F` なら `女`、`M` なら `男`。
- 生年月日: パスポート記載日を `YYYY/MM/DD` 形式で入力する。
- 出生地: パスポートの Place of birth を入力する。既存の正しい入力がある修正作業ではその値を維持する。
- 国籍: パスポートの国籍を入力する。
- 職業: 国名を入れない。情報がなければ空欄にする。
- 本国の居住地: 下記「住所・職歴の取得」ルールに従い、人物フォルダー内の技能実習生履歴書に記載された住所を入力する。パスポート番号を入れない。
- パスポートNo.: パスポート番号を入力する。
- パスポート期限: 有効期限を `YYYY/MM/DD` 形式で入力する。
- 配偶者: 基本は `無`。明示された場合だけ変更する。文字は正しい漢字の `無` を使う。
- 査証申請予定地: `YANGON` を既定値とする。
- 過去の出入国回数: `0` を既定値とする。
- 過去の在留資格認定証明書交付申請回数: `0` を既定値とする。
- うち不交付となった回数: `0` を入力せず、空欄にする。
- 犯罪を理由とする処分歴の有無: `無` を既定値とする。
- 有の場合の具体的な犯罪処分: 空欄にする。
- 退去強制または出国命令による出国の有無: `無` を既定値とする。
- 回数（退去強制または出国命令）: `0` を入力せず、空欄にする。
- 直近の送還歴: 空欄にする。
- 在日親族: `無` を既定値とする。
- 職歴: 下記「住所・職歴の取得」ルールに従い、古い順で職歴①～③へ入力する。

## 住所・職歴の取得

1. 各人物フォルダー直下で、ファイル名が `12 技能実習生の履歴書ver2012` から始まる `.pptx` を探す。
2. 同じ人物フォルダー内に複数ある場合は、ファイル名に `ver.2` を含むものを優先する。該当が複数なら更新日時が最も新しいものを使用する。
3. `ゴミ`、バックアップ、他人物のフォルダー内にある履歴書は使用しない。
4. 履歴書の住所欄を読み取り、本国の居住地（I列）へ入力する。前後の空白だけを除去し、住所の内容を推測・補完しない。
5. 履歴書の経歴から就労歴だけを抽出し、学校名や大学名などの学歴は職歴に含めない。
6. 各職歴について、会社・施設名と開始年月・終了年月を対応付ける。職種名は会社・施設名欄へ混ぜない。
7. 開始年月が古い職歴から昇順に並べる。開始年月が同じ場合は終了年月が古いものを先にし、在職中・現在勤務中は後にする。
8. 期間は `YYYY/MM~YYYY/MM` 形式に統一する。開始または終了年月が確認できない場合は推測せず、確認できた表記だけを使う。
9. 古い順の先頭3件を、職歴①（W列・X列）、職歴②（Y列・Z列）、職歴③（AA列・AB列）へ順に入力する。3件未満なら残りを空欄にする。4件以上ある場合は古い順の先頭3件だけを入力し、除外件数をユーザーへ報告する。
10. 履歴書が見つからない、または住所・職歴を判別できない場合は該当欄を空欄にしてユーザーへ報告する。

## フリガナの取得

1. プロジェクトフォルダー名から先頭の日付6桁を除いた名称を取得する。例: `260305 K96 Aichi Jikeikai Hitokea 1kisei F2pax` から `K96 Aichi Jikeikai Hitokea 1kisei F2pax` を得る。
2. 「個人共通」直下または対象プロジェクトフォルダー内で、`<日付を除いたプロジェクト名> Final Excel List.xlsx` を探す。例: `K96 Aichi Jikeikai Hitokea 1kisei F2pax Final Excel List.xlsx`。
3. ファイル内では、グループコードに対応する `<グループコード> Final` シートを優先する。例: `K96 Final`。該当シートがない場合は、見出し `名前` と `フリガナ` の両方を含むシートを1つだけ選ぶ。
4. 見出し `名前` と `フリガナ` の位置を探す。1人分の情報は同じ列に並ぶものとして扱う。K96の参照ファイルでは、3行目が名前、4行目がフリガナである。
5. パスポートの英字氏名と `名前` を照合する。比較時だけ、前後の空白を除去し、連続する空白を1つにし、大文字・小文字の違いを無視する。
6. 一意に一致した氏名と同じ列の `フリガナ` を、出力Excelのフリガナ欄（C列）へ入力する。
7. 同姓同名などで候補が複数ある場合、参照ファイルに `生年月日` の見出しがあれば、同じ列の生年月日とパスポートの生年月日を照合して一意に絞り込む。
8. 参照ファイルが見つからない場合、または一意に一致しない場合は、フリガナを空欄のままにしてユーザーへ報告する。推測、翻字、自動生成はしない。
9. `Final Excel List.xlsx` はフリガナ確認専用とし、他のパスポート項目の参照元にしない。また、参照ファイル自体を編集しない。
10. Googleスプレッドシート、オンラインの `Final` タブ、`★Name` タブ、`Name` タブは使用しない。

## 検証

- 出力ファイルが実体のある `.xlsx` であり、Excelで開けることを確認する。
- 対象者数、人物順、No.、氏名、性別、生年月日、出生地、国籍、パスポート番号、有効期限を照合する。
- フリガナはプロジェクトに対応するローカルの `Final Excel List.xlsx` で、氏名と同じ列にある値であることを確認する。
- 本国の居住地が各人物の技能実習生履歴書の住所と一致することを確認する。
- 職歴に学歴が混入していないこと、古い順の先頭3件が会社・施設名と期間の組としてW～AB列へ入っていることを確認する。
- 職業、居住地、パスポートNo.、パスポート期限、国籍が列ずれしていないことを確認する。
- 配偶者が `無`、査証申請予定地が `YANGON` であることを確認する。
- 過去の出入国回数と過去の在留資格認定証明書交付申請回数が `0` であることを確認する。
- うち不交付となった回数と退去強制または出国命令の回数が空欄であることを確認する。
- 犯罪を理由とする処分歴と退去強制または出国命令による出国が `無`、在日親族が `無` であることを確認する。
- G列とQ～U列が `#F4B083`、V列およびその他の黄色指定欄が `#FFFF00` であることを確認する。
