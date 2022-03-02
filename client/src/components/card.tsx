import cn from "classnames";

export type HospitalTypes = "Psychiatric" | "Dental" | "Diagnostics" | "Oncology" | "Cardiac" | "Urologic" | "Surgical" | "Private";
export type CardProps = {
	heading: string;
	type: HospitalTypes;
	address: string;
};

type Props = CardProps & {
	active: boolean;
	onClick: () => void;
};

const Card = ({ address, active, heading, type, onClick }: Props) => {
	return (
		<div
			onClick={onClick}
			className={cn("cursor-pointer card-body rounded-xl shadow-md mb-4 bordered border-4", {
				"border-primary ring-primary": active,
			})}>
			<h2 className="card-title">{heading}</h2>
			<div className="flex flex-col gap-4 mt-2">
				<p className="flex gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-5 min-w-max text-primary">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="16"></line>
						<line x1="8" y1="12" x2="16" y2="12"></line>
					</svg>
					<span className="text-primary font-bold">Type:</span>
					{type}
				</p>
				<p className="flex gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-5 min-w-max text-primary">
						<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
						<circle cx="12" cy="10" r="3"></circle>
					</svg>
					<span className="text-primary font-bold sm:inline block">Address:</span> {address}
				</p>
			</div>
		</div>
	);
};

export default Card;
