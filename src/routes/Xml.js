import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import styles from "../styles/Xml.module.css";

const Xml = () => {
	const [file, setFile] = useState("");
	const [fileName, setFileName] = useState("");
	const [data, setData] = useState(null);
	const [isDragOn, setIsDragOn] = useState(false);
	const [startLanguages, setStartLanguages] = useState([]);
	const [startLanguage, setStartLanguage] = useState("");
	const [endLanguage, setEndLanguage] = useState("");

	const extractEntries = (rawText) => {
		const entryRE =
			/<entry id="(?<id>.+?)"><!\[CDATA\[(?<content>[\S\s\n\r]*?)\]\]><\/entry>/g;

		const entryRaws = rawText.match(entryRE);

		const entrySets = entryRaws.map((entryRaw) => {
			const entryRE =
				/<entry id="(?<id>.+?)"><!\[CDATA\[(?<content>[\S\s\n\r]*?)\]\]><\/entry>/g;

			return entryRE.exec(entryRaw).groups;
		});

		return entrySets;
	};

	const extractLanguages = (rawText) => {
		const languageRE =
			/<language id="(?<id>.+?)">(?<content>[\S\s\n\r]*?)<\/language>/g;

		const languageRaws = rawText.match(languageRE);

		const languageSets = languageRaws.map((languageRaw) => {
			const languageRE =
				/<language id="(?<id>.+?)">(?<content>[\S\s\n\r]*?)<\/language>/g;

			const {
				groups: { id, content },
			} = languageRE.exec(languageRaw);

			const languageSet = { id: id, content: extractEntries(content) };

			return languageSet;
		});

		return languageSets;
	};

	const handleDropboxDrop = (event) => {
		event.preventDefault();
		setIsDragOn(false);

		try {
			const inputFile = [...event.dataTransfer.files][0];

			if (!inputFile || inputFile.type !== "text/xml") {
				throw new Error("XML 파일이 아닙니다.");
			}

			setFile(inputFile);
			setFileName(inputFile.name);
		} catch (error) {
			alert(error.message);
		}
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		try {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result;
				const languageSets = extractLanguages(
					result.replace(/\r/g, "")
				);
				setStartLanguages(languageSets.map((set) => set.id));
				setData(languageSets);
				alert("업로드가 완료되었습니다.");
			};
			reader.readAsText(file);
		} catch (error) {
			alert(error.message);
		}
	};

	const handleSelectChange = (event) => {
		setStartLanguage(event.target.value);
	};

	const handleDownloadClick = (event) => {
		let dataSet;

		if (startLanguage === "") {
			alert("출발 언어를 선택해주세요.");
			return;
		}

		try {
			const startData = data.find(
				(item) => item.id === startLanguage
			).content;

			if (startLanguages.indexOf(endLanguage) !== -1) {
				const endData = data.find(
					(item) => item.id === endLanguage
				).content;
				dataSet = startData.map((item, index) => ({
					index,
					id: item.id,
					[startLanguage]: item.content,
					[endLanguage]: endData[index]?.content,
				}));
			} else {
				dataSet = startData.map((item, index) => ({
					index,
					id: item.id,
					[startLanguage]: item.content,
					[endLanguage]: "",
				}));
			}

			const worksheet = XLSX.utils.json_to_sheet(dataSet);
			const new_workbook = XLSX.utils.book_new();

			XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
			XLSX.writeFile(new_workbook, "filename.xlsx");
		} catch (error) {
			alert(error.message);
		}
	};

	const handleFavoriteSubmit = (event) => {
		event.preventDefault();
		localStorage.setItem("favorite_end_language", endLanguage);
	};

	useEffect(() => {
		localStorage.getItem("favorite_end_language") &&
			setEndLanguage(localStorage.getItem("favorite_end_language"));
	}, []);

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
					accept=".xml"
					onChange={(event) => setFile(event.target.files[0])}
				/>
				<button type="submit">업로드</button>
			</form>
			{data && (
				<>
					<div className={styles.options}>
						<label>
							<p>출발 언어</p>
							<select
								className={styles.input}
								onChange={handleSelectChange}
							>
								<option value="">언어를 선택해주세요</option>
								{startLanguages.map((lang) => (
									<option key={lang} value={lang}>
										{lang}
									</option>
								))}
							</select>
						</label>
						<form onSubmit={handleFavoriteSubmit}>
							<label>
								<p>도착 언어</p>
								<input
									className={styles.input}
									type="text"
									required
									value={endLanguage}
									onChange={(event) =>
										setEndLanguage(event.target.value)
									}
								/>
							</label>
							<button type="submit">기본 언어로 등록</button>
						</form>
					</div>
					<button onClick={handleDownloadClick}>변환</button>
				</>
			)}
		</div>
	);
};

export default Xml;
