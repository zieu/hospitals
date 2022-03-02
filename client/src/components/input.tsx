import { HTMLInputTypeAttribute } from "react";
import cn from "classnames";

type Props = JSX.IntrinsicElements["input"] & {
	label?: string;
	placeholder?: string;
	id: string;
	type?: HTMLInputTypeAttribute;
	className?: string;
	labelCls?: string;
	inputCls?: string;
};

const Input = ({ label, labelCls, inputCls, className, id, placeholder, type = "text", ...props }: Props) => {
	return (
		<div className={cn("flex flex-col w-full", className)}>
			<label htmlFor={id} className={cn("mb-1 opacity-90", labelCls)}>
				{label}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				className={cn("input text-base input-primary input-bordered focus:ring-offset-yellow-400", inputCls)}
				{...props}
			/>
		</div>
	);
};

export default Input;
