import {Platform, Text} from 'react-native'
import React from 'react'


type FontStyle = 'normal' | 'italic' | 'oblique'
type FontWeight =
	| 'normal'
	| 'bold'
	| 'bolder'
	| 'lighter'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'

// FIXME: This function is hideous
function double_pascal_case_to_two_words(str: string) {
	let index
	let count = 0
	for (let i = 0; i < str.length; i++) {
		let ch = str.charAt(i)
		if (ch >= 'A' && ch <= 'Z') {
			count++
		}
		if (count === 2 && !index) {
			index = i
		}
	}
	if (count === 2) {
		return str.substr(0, index) + ' ' + str.substring(index, str.length)
	} else {
		return str
	}
}

function font_style_generator(
	font_family: string,
	font_weight: FontWeight,
	font_style: FontStyle,
): {fontFamily: string; fontWeight: string} {
	let fontFamily = `${font_family}-`

	switch (font_weight) {
		case 'normal':
			fontFamily += 'Regular'
			break
		case 'bold':
			fontFamily += 'Bold'
			break
		case '100':
		case '200':
			fontFamily += 'Thin'
			break
		case '300':
		case '400':
			fontFamily += 'Light'
			break
		case '500':
		case '600':
			fontFamily += 'Medium'
			break
		case '700':
		case '800':
			fontFamily += 'Bold'
			break
		case '900':
			fontFamily += 'Black'
			break
		case 'bolder':
		case 'lighter':
		// @ts-ignore
		case 'default':
			fontFamily += 'Regular'
			break
	}

	if (font_style === 'italic') {
		fontFamily += 'Italic'
	}

	return {fontFamily: fontFamily, fontWeight: 'normal'}
}

const oldRender = (Text as any).render

class FontManager {
	async init(isExpo: boolean = true) {
		if (isExpo) {
			const Font = require('expo-font');
			// @ts-ignore
			await Font.loadAsync({
				'Roboto-Black': require('./fonts/Roboto-Black.ttf'),
				'Roboto-Medium': require('./fonts/Roboto-Medium.ttf'),
				'Roboto-Bold-Medium': require('./fonts/Roboto-Bold.ttf'),
				'Roboto-Regular': require('./fonts/Roboto-Regular.ttf'),
				'Roboto-Thin': require('./fonts/Roboto-Thin.ttf'),
				'Roboto-Bold': require('./fonts/Roboto-Bold.ttf'),
				'Roboto-Light': require('./fonts/Roboto-Light.ttf'),
			});
		}
		(Text as any).render = this.override
	}

	override(...args) {
		/* FIXME: Determine if this was the correct thing to do
     *   Original code  ->  const origin = oldRender.call(this, ...args);
     *   Used to contain error 'the containing arrow function captures the global'
     *   Therefore swapped it to function instead of arrow to remove global scope
     */
		const origin = oldRender.call(this, ...args)

		if (Platform.OS === 'android') {
			if (origin.props.style) {
				const fontWeight: FontWeight = origin.props.style.fontWeight ? origin.props.style.fontWeight : '400'

				const fontStyle: FontStyle = origin.props.style.fontStyle ? origin.props.style.fontStyle : 'normal'
				// HACK: Disabled mutation of fontStyle as is immutable in some libaries
				// origin.props.style.fontStyle = 'normal'

				const fontFamily: string = origin.props.style.fontFamily ? origin.props.style.fontFamily : 'Roboto'

				return React.cloneElement(origin, {
					style: [{}, origin.props.style, font_style_generator(fontFamily, fontWeight, fontStyle)],
				})
			}
			return origin
		} else {
			if (origin.props.style) {
				if (origin.props.style.fontFamily) {
					const fontFamily: string = origin.props.style.fontFamily
					origin.props.style.fontFamily = double_pascal_case_to_two_words(fontFamily)
				}
			}
			return origin
		}
	}
}
export default new FontManager()
