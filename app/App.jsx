import React, { useEffect, useState } from 'react'
import {
  SafeAreaView, StatusBar, Text,
} from 'react-native'

import './src/core/fontawesome'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashScreen from './src/screens/Splash'
import SignInScreen from './src/screens/SignIn'
import SignUpScreen from './src/screens/SignUp'
import HomeScreen from './src/screens/Home'
import SearchScreen from './src/screens/Search'
import MessagesScreen from './src/screens/Message'

import useGlobal from './src/core/global'


const LightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'white'
	}
}


const Stack = createNativeStackNavigator()


function App() {
	const initialized = useGlobal(state => state.initialized)
	const authenticated = useGlobal(state => state.authenticated)

	const init = useGlobal(state => state.init)

	useEffect(() => {
		init()
	}, [])

	return (
		<NavigationContainer theme={LightTheme}>
			<StatusBar barStyle='dark-content' />
			<Stack.Navigator>
				{!initialized ? (
					<>
     				<Stack.Screen name="Splash" component={SplashScreen} />
					</>
				) : !authenticated ? (
					<>
      			<Stack.Screen name="SignIn" component={SignInScreen} />
      			<Stack.Screen name="SignUp" component={SignUpScreen} />
					</>
				) : (
					<>
      			<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Search" component={SearchScreen} />
						<Stack.Screen name="Messages" component={MessagesScreen} />
					</>
				)}
    	</Stack.Navigator>
		</NavigationContainer>
	)
}


export default App
