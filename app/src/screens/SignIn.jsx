import { useLayoutEffect, useState } from "react"
import { 
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView, 
	Text, 
	TextInput,
	TouchableOpacity, 
	TouchableWithoutFeedback, 
	View 
} from "react-native"
import Title from "../common/Title"
import Input from "../common/Input"
import Button from "../common/Button"
import api from "../core/api"
import utils from "../core/utils"
import useGlobal from "../core/global"



function SignInScreen({ navigation }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [usernameError, setUsernameError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const login = useGlobal(state => state.login)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [])

	function onSignIn() {
		console.log('onSignIn:', username, password)

		// Check username
		const failUsername = !username
		if (failUsername) {
			setUsernameError('Username not provided')
		}
		// Check password
		const failPassword = !password
		if (failPassword) {
			setPasswordError('Password not provided')
		}
		// Break out of this function if there were any issues
		if (failUsername || failPassword) {
			return
		}
		// Make signin request
		api({
			method: 'POST',
			url: '/chat/signin/',
			data: {
				username: username,
				password: password
			}
		})
		.then(response => {
			utils.log('Sign In:', response.data)
			
			const credentials = {
				username: username,
				password: password
			}
			login(
				credentials, 
				response.data.user,
				response.data.tokens
			)
		})
		.catch(error => {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			console.log(error.config);
		})
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View 
						style={{ 
							flex: 1, 
							justifyContent: 'center',
							paddingHorizontal: 20
						}}
					>
						<Title text='RealtimeChat' color='#202020' />

						<Input 
							title='Username'
							value={username}
							error={usernameError}
							setValue={setUsername}
							setError={setUsernameError}
						/>

						<Input 
							title='Password' 
							value={password}
							error={passwordError}
							setValue={setPassword}
							setError={setPasswordError}
							secureTextEntry={true}
						/>

						<Button 
							title='Sign In' 
							onPress={onSignIn} 
						/>

						<Text style={{ textAlign: 'center', marginTop: 40 }}>
							Don't have an account? <Text 
								style={{ color: 'blue' }}
								onPress={() => navigation.navigate('SignUp')}
							>
								Sign Up
							</Text>
						</Text>

					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default SignInScreen