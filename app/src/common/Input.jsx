import { View, Text, TextInput } from "react-native"


function Input({ title, value, error, setValue, setError, secureTextEntry=false }) {
	return (
		<View>
			<Text 
				style={{ 
					color: error ? '#ff5555' : '#70747a',
					marginVertical: 6,
					paddingLeft: 16 
				}}
			>
				{error ? error : title}
			</Text>
			<TextInput
				autoCapitalize="none"
				autoComplete="off"
				onChangeText={text => {
					setValue(text)
					if (error) {
						setError('')
					}
				}}
				secureTextEntry={secureTextEntry}
				style={{
					backgroundColor: '#e1e2e4',
					borderWidth: 1,
					borderColor: error ? '#ff5555' : 'transparent',
					borderRadius: 26,
					height: 52,
					paddingHorizontal: 16,
					fontSize: 16
				}}
				value={value}
			/>
		</View>
	)
}

export default Input