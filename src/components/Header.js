import styles from "../styles/Header.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<img src={process.env.PUBLIC_URL + "logo.png"} alt="" />
			<h1>다키스트 던전 번역 지원툴</h1>
		</div>
	);
};

export default Header;
