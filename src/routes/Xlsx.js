import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import styles from "../styles/Xlsx.module.css";

const Xlsx = () => {
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [isDragOn, setIsDragOn] = useState(false);

	const convertToJson = (file) => {
		const workbook = XLSX.read(file, { type: "binary" });
		const sheet = workbook.Sheets[workbook.SheetNames[0]];
		const json = XLSX.utils.sheet_to_json(sheet);

		return json;
	};

	const convertToXml = (json) => {
		const languages = Object.keys(json[0]).filter(
			(key) => key !== "index" && key !== "id"
		);

		let content = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n`;

		languages.forEach((language) => {
			content += `\t<language id="${language}">\n`;
			json.forEach((item) => {
				content += `\t\t<entry id="${item.id}"><![CDATA[${item[language]}]]></entry>\n`;
			});
			content += "\t</language>\n";
		});

		content += "</root>";

		const blob = new Blob([content], { type: "text/xml;charset=utf-8" });
		saveAs(blob, "string_table.xml");
	};

	const handleDropboxDrop = (event) => {
		event.preventDefault();
		setIsDragOn(false);

		try {
			const inputFile = [...event.dataTransfer.files][0];

			if (!inputFile || !inputFile.type.includes("spreadsheet")) {
				throw new Error("XLSX 파일이 아닙니다.");
			}

			setFile(inputFile);
			setFileName(inputFile.name);
		} catch (error) {
			alert(error.message);
		}
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const reader = new FileReader();
		reader.onloadend = () => {
			const result = reader.result;
			const json = convertToJson(result);
			convertToXml(json);
		};
		reader.readAsBinaryString(file);
	};

	return (
		<div className={styles.container}>
			<h2>{fileName || "파일 드롭"}</h2>
			<div
				className={`${styles.dropbox} ${isDragOn && styles.active}`}
				onDragOver={(event) => event.preventDefault()}
				onDrop={handleDropboxDrop}
				onDragEnter={(event) => {
					event.preventDefault();
					setIsDragOn(true);
				}}
				onDragLeave={(event) => {
					event.preventDefault();
					setIsDragOn(false);
				}}
			></div>
			<p>또는</p>
			<form onSubmit={handleFormSubmit}>
				<input
					type="file"
					accept=".xlsx"
					onChange={(event) => setFile(event.target.files[0])}
				/>
				<button type="submit">변환</button>
			</form>
		</div>
	);
};

export default Xlsx;
