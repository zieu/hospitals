import cn from "classnames";

type Option = {
	label: string;
	value: any;
	disabled?: boolean;
	selected?: boolean;
};

type Props = JSX.IntrinsicElements["select"] & {
	label?: string;
	placeholder?: string;
	id: string;
	className?: string;
	labelCls?: string;
	selectCls?: string;
	options: Option[];
};

const Select = ({ label, labelCls, selectCls, className, id, options, ...props }: Props) => {
	return (
		<div className={cn("flex flex-col", className)}>
			<label htmlFor={id} className={cn("mb-1 opacity-90", labelCls)}>
				{label}
			</label>
			<select className={cn("text-base select select-primary select-bordered", selectCls)} id={id} {...props}>
				{options?.map(({ label, value, disabled, selected }, index) => (
					<option key={index} disabled={disabled} value={value} selected={selected}>
						{label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
