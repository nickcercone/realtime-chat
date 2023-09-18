import { useEffect, useLayoutEffect } from "react"
import { SafeAreaView, Text, TouchableOpacity, View, Image } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import RequestsScreen from "./Requests"
import FriendsScreen from "./Friends"
import ProfileScreen from "./Profile"
import useGlobal from "../core/global"
import Thumbnail from "../common/Thumbnail"


const Tab = createBottomTabNavigator()



function HomeScreen({ navigation }) {
	const socketConnect = useGlobal(state => state.socketConnect)
	const socketClose = useGlobal(state => state.socketClose)
	const user = useGlobal(state => state.user)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		})
	}, [])

	useEffect(() => {
		socketConnect()
		return () => {
			socketClose()
		}
	}, [])

	function onSearch() {
		navigation.navigate('Search')
	}

	return (
		<Tab.Navigator 
			screenOptions={({ route, navigation }) => ({
				headerLeft: () => (
					<View style={{ marginLeft: 16 }}>
						<Thumbnail
							url={user.thumbnail}
							size={28}
						/>
					</View>
				),
				headerRight: () => (
					<TouchableOpacity
						onPress={onSearch}
					>
						<FontAwesomeIcon 
							style={{ marginRight: 16 }}
							icon='magnifying-glass' 
							size={22} 
							color='#404040'
						/>
					</TouchableOpacity>
				),
				tabBarIcon: ({ focused, color, size }) => {
					const icons = {
						Requests: 'bell',
						Friends: 'inbox',
						Profile: 'user'
					}
					const icon = icons[route.name]
					return (
						<FontAwesomeIcon icon={icon} size={28} color={color} />
					)
				},
				tabBarActiveTintColor: '#202020',
				tabBarShowLabel: false
			})}
		>
      <Tab.Screen name="Requests" component={RequestsScreen} />
			<Tab.Screen name="Friends"  component={FriendsScreen} />
			<Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
	)
}

export default HomeScreen