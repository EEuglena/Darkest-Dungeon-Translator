import styles from "../styles/About.module.css";

const About = () => {
	return (
		<div className={styles.container}>
			<h2>뭐하는 사이트인가요?</h2>
			<p>
				다키스트 던전 모드 번역을 지원하는 도구입니다. XML 파일을
				번역하기 쉽도록 XLSX(엑셀) 파일로 추출하는 작업과, 추출해서
				번역을 완료한 XLSX 파일을 다시 XML 파일로 만들어 주는 작업이
				가능합니다. 추후 배포를 도와주는 기능도 추가할 계획입니다.
			</p>
			<h2>사용방법</h2>
			<h3>XML → XLSX</h3>
			<p>
				<ol>
					<li>드롭 또는 선택 창에서 파일을 선택합니다.</li>
					<li>업로드 버튼을 누릅니다.</li>
					<li>표시되는 출발 언어 중 원하는 것을 선택합니다.</li>
					<li>
						도착 언어를 입력합니다.{" "}
						<strong>
							기본 언어로 등록하면 매번 입력할 필요가 없습니다.
						</strong>
					</li>
					<li>변환 버튼을 눌러 완료된 파일을 다운로드 받습니다.</li>
				</ol>
			</p>
			<h3>XLSX → XML</h3>
			<p>
				<ol>
					<li>드롭 또는 선택 창에서 파일을 선택합니다.</li>
					<li>변환 버튼을 눌러 완료된 파일을 다운로드 받습니다.</li>
				</ol>
			</p>
			<h3>PUBLISH</h3>
			<p>
				.loc(.loc2) 파일을 이용한 배포와 창작마당을 이용한 배포를
				지원하는 기능을 추가할 계획입니다.
			</p>
		</div>
	);
};

export default About;
