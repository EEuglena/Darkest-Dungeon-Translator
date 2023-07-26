import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Xml from "../routes/Xml";
import Xlsx from "../routes/Xlsx";
import Publish from "../routes/Publish";
import Navigator from "./Navigator";
import About from "../routes/About";

const Router = () => {
	return (
		<BrowserRouter basename="/Darkest-Dungeon-Translator">
			<Navigator />
			<Routes>
				<Route path="/xml" element={<Xml />}></Route>
				<Route path="/xlsx" element={<Xlsx />}></Route>
				<Route path="/publish" element={<Publish />}></Route>
				<Route path="/" element={<About />}></Route>
				<Route path="/*" element={<Navigate to="/" />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
