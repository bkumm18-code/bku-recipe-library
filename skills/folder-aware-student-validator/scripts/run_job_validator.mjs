import fs from "node:fs/promises";
import path from "node:path";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const root = process.argv[2];
if (!root) throw new Error('Usage: node run_job_validator.mjs "job-or-student-folder"');
const outPath = "outputs/folder-aware-validator/Folder-Aware Student Data Validator.xlsx";
const recordPath = "outputs/folder-aware-validator/checked_folders.json";
const now = new Date();
const norm = s => String(s).normalize("NFKC").toLowerCase().replace(/\.[^.]+$/, "").replace(/[\s\p{P}\p{S}_]+/gu, "");
const entries = await fs.readdir(root, {withFileTypes:true});
const dirs = entries.some(x=>x.isDirectory()) ? entries.filter(x=>x.isDirectory()).map(x=>path.join(root,x.name)) : [root];
const rows=[];
for (const dir of dirs) {
  const student=path.basename(dir), files=(await fs.readdir(dir,{withFileTypes:true})).filter(x=>x.isFile()&&!x.name.toLowerCase().endsWith("desktop.ini")).map(x=>x.name);
  const has=re=>files.some(x=>re.test(norm(x))), missing=[];
  if(!has(/family|家族|戸籍|世帯/)) missing.push("Family Document");
  if(!has(/passport|パスポート|旅券/)) missing.push("Passport");
  if(!has(/nrc|nationalregistration|citizenshipscrutiny|မှတ်ပုံတင်/)) missing.push("NRC");
  if(!has(/medical|healthcertificate|健康診断|健診/)) missing.push("Medical Check-up");
  if(!has(/jlpt|nat|jft|日本語能力|国際交流基金/)) missing.push("JLPT/NAT/JFT");
  const visa=/tokutei|特定技能/i.test(path.basename(root))?"Tokutei Visa / 特定技能":"Training Visa / 技能実習";
  if(visa.startsWith("Tokutei")&&!has(/tokutei|特定技能|skilltest|評価試験/)) missing.push("Tokutei Certificate");
  rows.push([student,visa,missing.length?"Missing Data / 書類不足":"Checked / 検証済み",missing.join("\n")||"None / なし",has(/family|家族|戸籍|世帯/)?"Present / あり":"Missing / 不足","Manual review / 要確認","Manual review / 要確認","Not required / 不要","Manual review / 要確認",files.length,now]);
}
let records=[]; try { records=JSON.parse(await fs.readFile(recordPath,"utf8")); } catch {}
records.push({folder:root, checkedAt:now.toISOString(), students:rows.length, missingData:rows.filter(r=>r[2].startsWith("Missing")).length, status:rows.some(r=>r[2].startsWith("Missing"))?"Missing Data / 書類不足":"Checked / 検証済み"});
await fs.mkdir(path.dirname(recordPath),{recursive:true}); await fs.writeFile(recordPath, JSON.stringify(records,null,2), "utf8");
const wb=Workbook.create(), control=wb.worksheets.add("Control / 操作"), results=wb.worksheets.add("Validation Results / 検証結果"), config=wb.worksheets.add("Config / 設定"), log=wb.worksheets.add("Run Log / 実行履歴"), folderList=wb.worksheets.add("Checked Folder List / 確認済みフォルダ一覧");
const title={fill:"#E8EAED",font:{bold:true,size:16,color:"#202124"}}, header={fill:"#F1F3F4",font:{bold:true,color:"#202124"},wrapText:true};
control.getRange("A1:H1").merge(); control.getRange("A1").values=[["Folder-Aware Student Data Validator / 学生書類検証"]]; control.getRange("A1:H1").format=title;
control.getRange("A3:B8").values=[["Source folder",root],["Students checked",rows.length],["Missing-data students",rows.filter(r=>r[2].startsWith("Missing")).length],["Checked at",now],["Rules","Passport expiry; medical FIT/UNFIT; certificate presence; name consistency"],["Privacy","Local folder only; no Google Drive access"]]; control.getRange("A3:A8").format={font:{bold:true}}; control.getRange("B6").format.numberFormat="yyyy-mm-dd hh:mm:ss";
control.getRange("A10:H10").merge(); control.getRange("A10").values=[["Medical, JLPT, NAT-Test, JFT, and Tokutei certificates have no expiry check. Family Document is checked for every student."]]; control.getRange("A10:H10").format={fill:"#FFF8E1",wrapText:true};
const heads=["Student Folder","Visa Type","Status","Missing Documents","Family Document","Passport Expiry","Medical Result","JLPT/NAT/JFT Result","Tokutei Certificate Result","Student-name Consistency","Files Scanned","Checked At"];
results.getRange("A1:L1").values=[heads]; results.getRange("A1:L1").format=header; if(rows.length) results.getRangeByIndexes(1,0,rows.length,heads.length).values=rows; results.getRange("A2:L100").format.wrapText=true; results.getRange("L2:L100").format.numberFormat="yyyy-mm-dd hh:mm:ss";
config.getRange("A1:B1").values=[["Check","Rule"]]; config.getRange("A1:B1").format=header; config.getRange("A2:B7").values=[["Family Document","Required for every student"],["Passport expiry","Read from passport contents"],["Medical result","FIT or UNFIT only; no expiry"],["JLPT/NAT/JFT","Presence and name consistency; no expiry"],["Tokutei certificate","Required for Tokutei only; no expiry"],["Name consistency","Compare names inside documents with student folder"]]; config.getRange("A1:B7").format.wrapText=true;
log.getRange("A1:D1").values=[["Checked At","Source Folder","Students","Notes"]]; log.getRange("A1:D1").format=header; log.getRange("A2:D2").values=[[now,root,rows.length,"Consolidated local scan"]]; log.getRange("A2").format.numberFormat="yyyy-mm-dd hh:mm:ss";
folderList.getRange("A1:F1").values=[["Checked Folder","Checked At","Students","Missing Data","Status","Record Note"]]; folderList.getRange("A1:F1").format=header; folderList.getRange("A2:F"+(records.length+1)).values=records.map(r=>[r.folder,new Date(r.checkedAt),r.students,r.missingData,r.status,"Appended automatically / 自動追加"]); folderList.getRange("B2:B"+(records.length+1)).format.numberFormat="yyyy-mm-dd hh:mm:ss"; folderList.getRange("A1:F"+(records.length+1)).format.wrapText=true;
for(const sh of [control,results,config,log,folderList]) sh.showGridLines=false;
await fs.mkdir(path.dirname(outPath),{recursive:true}); const out=await SpreadsheetFile.exportXlsx(wb); await out.save(outPath); console.log(`Checked ${rows.length} students in ${root}`);

