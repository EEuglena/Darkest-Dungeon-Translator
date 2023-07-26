import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
	return (
		<div className={styles.footer}>
			<p>오류 제보 및 피드백은 아래 이메일로 부탁드립니다.</p>
			<FontAwesomeIcon icon={faEnvelope} />
			<a href="mailto:darkestdungeontrans@gmail.com">
				darkestdungeontrans@gmail.com
			</a>
		</div>
	);
};

export default Footer;
