import { useEffect, useState } from "react";
type TPatient = {
	fullName: string;
	age: number;
	phoneNumber: string;
	medicalService: string;
	address: string;
	hospital: string;
};

const Patients = () => {
	const [patientsList, setPatientsList] = useState<Array<TPatient>>();

	useEffect(() => {
		fetch("http://localhost:5000/patients")
			.then((res) => res.json())
			.then((data) => {
				setPatientsList(data.reverse());
			});
	}, []);

	return (
		<div className="overflow-x-auto">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Age</th>
						<th>Phone number</th>
						<th>Medical Service</th>
						<th>Address</th>
						<th>Hospital</th>
					</tr>
				</thead>
				<tbody>
					{patientsList?.map((row, enumeration) => (
						<tr key={enumeration}>
							<td>{enumeration + 1}</td>
							<td>{row?.fullName}</td>
							<td>{row?.age}</td>
							<td>{row?.phoneNumber}</td>
							<td>{row?.medicalService}</td>
							<td>{row?.address}</td>
							<td>{row?.hospital}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Patients;
