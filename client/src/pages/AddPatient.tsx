import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import Card, { HospitalTypes } from "../components/card";
import Input from "../components/input";
import Select from "../components/select";
import { medicalServices, postCodes } from "../selectOptions";
import cn from "classnames";

type THospital = {
	postCode: number;
	name: string;
	type: HospitalTypes;
	forChildren: boolean;
	address: string;
};

function AddPatient() {
	const [hospitals, setHospitals] = useState<Array<THospital>>();
	const [fetching, setFetching] = useState(false);
	const [saving, setSaving] = useState(false);

	// form states
	const [fullName, setFullName] = useState<string>();
	const [age, setAge] = useState<number | null>(null);
	const [phoneNumber, setPhoneNumber] = useState<string>();
	const [medicalService, setMedicalService] = useState<string | null>(null);
	const [address, setAddress] = useState<string>();
	const [postCode, setPostCode] = useState<number | null>(null);
	const [selectedHospital, setSelectedHostpital] = useState<string>();
	const [ageFilter, setAgeFilter] = useState(false);

	useEffect(() => {
		if (postCode && medicalService) {
			setFetching(true);
			setSelectedHostpital(undefined);
			fetch("http://localhost:5000/hospitals?" + new URLSearchParams({ postCode: String(postCode), type: medicalService || "" }))
				.then((res) => res.json())
				.then((data) => {
					setFetching(false);
					if (ageFilter && age && age < 18) {
						setHospitals(data.filter((hospital: THospital) => !!hospital.forChildren));
					} else if (ageFilter) {
						setHospitals(data.filter((hospital: THospital) => !hospital.forChildren));
					} else {
						setHospitals(data);
					}
				});
		}
	}, [postCode, medicalService, ageFilter, age]);

	const selectHospitalHandler = (name: string) => {
		if (selectedHospital === name) {
			setSelectedHostpital(undefined);
		} else {
			setSelectedHostpital(name);
		}
	};

	const onSubmitHandler = (e: SyntheticEvent) => {
		e.preventDefault();

		if (selectedHospital && medicalService && postCode) {
			setSaving(true);
			fetch("http://localhost:5000/patients", {
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullName,
					age,
					phoneNumber,
					medicalService,
					address,
					postCode,
					hospital: selectedHospital,
				}),
			}).then(() => {
				location.reload();
			});
		}
	};

	return (
		<Fragment>
			<div className="flex justify-between gap-6">
				{/* Form */}
				<div className="relative">
					<form className="form-control flex flex-column flex-wrap gap-4 w-96 sticky top-8" onSubmit={onSubmitHandler}>
						<Input
							id="name"
							label="Patient's fullname"
							type="text"
							placeholder="Fullname"
							required
							onChange={(e) => setFullName(e.target.value)}
						/>
						<Input
							id="age"
							required
							label="Patient's age"
							type="number"
							placeholder="Age"
							onChange={(e) => setAge(Number(e.target.value))}
						/>
						<Input
							id="phoneNumber"
							label="Patient's phone number"
							type="tel"
							placeholder="Phone number"
							required
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
						<Select
							id="medicalService"
							label="Medical Service"
							placeholder="Choose"
							onChange={(e: any) => setMedicalService(e?.target?.value)}
							required
							options={[
								{ label: "choose", value: "choose", disabled: true, selected: true },
								...medicalServices.map((ms) => ({
									label: ms,
									value: ms,
								})),
							]}
						/>
						<Input
							id="address"
							label="Address"
							placeholder="Patient's address"
							required
							onChange={(e) => setAddress(e.target.value)}
						/>
						<Select
							id="postCode"
							required
							label="Postal Code"
							onChange={(e: any) => setPostCode(e?.target?.value)}
							options={[
								{ label: "choose", value: "choose", disabled: true, selected: true },
								...postCodes.map((pc) => ({
									label: pc.toString(),
									value: pc,
								})),
							]}
						/>

						<button
							disabled={!selectedHospital || saving}
							type="submit"
							className={cn("btn btn-primary capitalize rounded-lg", { loading: saving })}>
							Save
						</button>
					</form>
				</div>

				{/* Cards */}
				<div className={cn("card-side min-w-[400px] w-[700px]", { hidden: !hospitals })}>
					<label className="label justify-start" htmlFor="age-filter">
						<input
							onChange={(e) => setAgeFilter(e.target.checked)}
							type="checkbox"
							className="toggle toggle-primary mr-2"
							id="age-filter"
						/>
						<span className="label-text text-base">Filter hospitals by age</span>
					</label>
					{hospitals?.length !== 0 ? (
						hospitals?.map((hospital, index) => (
							<Card
								key={index}
								onClick={() => selectHospitalHandler(hospital.name)}
								active={selectedHospital === hospital.name}
								address={hospital?.address}
								heading={hospital?.name}
								type={hospital?.type}
							/>
						))
					) : fetching ? (
						<div className="loading btn btn-circle btn-ghost btn-block btn-xl text-primary text-2xs"></div>
					) : (
						<div className="mt-8">Could not find anything for you :(</div>
					)}
				</div>
			</div>
		</Fragment>
	);
}

export default AddPatient;
