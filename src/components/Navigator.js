import styles from "../styles/Navigator.module.css";

const Navigator = () => {
	return (
		<div className={styles.container}>
			<a href="/">ABOUT</a>
			<a href="/xml">XML → XLSX</a>
			<a href="/xlsx">XLSX → XML</a>
			<a href="/publish">⛔PUBLISH🛠</a>
		</div>
	);
};

export default Navigator;
