import * as React from "react";
import { css } from "glamor";




const styles = {
	progressContainer: (
		round,
		height,
		border
	) => {
		const convertedHeight = typeof height === "string" ? height : height + "px";
		return css({
			width: "100%",
			height: convertedHeight,
			position: "relative",
			border,
			borderRadius: round ? "400px" : "0",
			overflow: "hidden",
		});
	},
	progressBackground: (backgroundColor) =>
		css({
			backgroundColor,
			width: "100%",
			height: "100%",
			position: "absolute",
			top: 0,
			left: 0,
		}),
	progressElement: (
		backgroundColor,
		offset,
		value,
		transitionTime,
		roundRight,
		textColor,
		fontSize
	) => {
		const roundRightString = roundRight ? "40px 40px" : "0 0";
		return css({
			backgroundColor,
			width: value + "%",
			zIndex: 8,
			height: "100%",
			top: 0,
			left: offset + "%",
			position: "absolute",
			transition:
				"width " +
				transitionTime +
				"s ease-in-out, left " +
				transitionTime +
				"s ease-in-out",
			borderRadius: "0 " + roundRightString + " 0",
			color: textColor,
			textAlign: "center",
			fontSize: fontSize ? fontSize : 8,
		});
	},
};

const createElementArray = (
	elements,
	transitionTime,
	roundLastElement
) => {
	let currentOffset = 0;
	let newElements = [];

	elements.forEach((element, i) => {
		newElements.push(
			<div
				{...styles.progressElement(
					element.color,
					currentOffset,
					element.value,
					transitionTime,
					i === elements.length - 1 && roundLastElement,
					element.textColor,
					element.fontSize
				)}
				key={i}
			>
				{element.showPercentage && `${element.value}%`}
			</div>
		);
		currentOffset += element.value;
	});
	return newElements;
};

const MultiProgress = ({
	backgroundColor = "#ffffff",
	border = "",
	elements,
	height = 10,
	round = true,
	roundLastElement = true,
	transitionTime = 0.6,
}) => {
	console.log(elements)
	return (
		<div {...styles.progressContainer(round, height, border)}>
			<div {...styles.progressBackground(backgroundColor)} />
			{createElementArray(elements, transitionTime, roundLastElement).map(
				(element, i) => (
					<div key={i}>{element}</div>
				)
			)}
		</div>
	);
};

export default MultiProgress;