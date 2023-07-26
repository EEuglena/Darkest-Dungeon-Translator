import { Link } from "react-router-dom";
import styles from "../styles/Navigator.module.css";

const Navigator = () => {
	return (
		<div className={styles.container}>
			<Link to={"/"}>ABOUT</Link>
			<Link to={"/xml"}>XML → XLSX</Link>
			<Link to={"/xlsx"}>XLSX → XML</Link>
			<Link to={"/publish"}>⛔PUBLISH🛠</Link>
		</div>
	);
};

export default Navigator;
