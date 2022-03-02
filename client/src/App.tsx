import { ReactNode, useState } from "react";
import AddPatient from "./pages/AddPatient";
import Patients from "./pages/Patients";

export type TPage = "add-patient" | "patients-list";
type TPageInfo = {
	page: ReactNode;
	heading: string;
	linkTo: TPage;
	linkHeading: string;
};

function App() {
	const [activePage, setActivePage] = useState<TPage>("add-patient");

	const pages: Record<TPage, TPageInfo> = {
		"add-patient": {
			page: <AddPatient />,
			heading: "Patient Information Form",
			linkTo: "patients-list",
			linkHeading: "Patients",
		},
		"patients-list": {
			page: <Patients />,
			heading: "Patients List",
			linkTo: "add-patient",
			linkHeading: "Add patient",
		},
	};

	const current = pages[activePage];

	return (
		<div className="container mx-auto py-8">
			{/* Heading */}
			<div className="pb-4 mb-8 bordered border-b-2 border-primary flex justify-between">
				<h2 className="font-bold text-4xl text-primary">{current.heading}</h2>
				<button className="btn" onClick={() => setActivePage(current.linkTo)}>
					{current.linkHeading}
				</button>
			</div>
			{current.page}
		</div>
	);
}

export default App;
