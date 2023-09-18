import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useEffect, useState } from "react"
import { 
	FlatList,
	SafeAreaView, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	View 
} from "react-native"

import Empty from "../common/Empty"
import Thumbnail from "../common/Thumbnail"
import useGlobal from "../core/global"
import Cell from "../common/Cell"




function SearchButton({ user }) {
	// Add tick if user is already  connected
	if (user.status === 'connected') {
		return  (
			<FontAwesomeIcon
				icon='circle-check'
				size={30}
				color='#20d080'
				style={{
					marginRight: 10
				}}
			/>
		)
	}

	const requestConnect = useGlobal(state => state.requestConnect)
	
	const data = {}

	switch (user.status) {
		case 'no-connection':
			data.text = 'Connect'
			data.disabled = false
			data.onPress = () => requestConnect(user.username)
			break
		case 'pending-them':
			data.text = 'Pending'
			data.disabled = true
			data.onPress = () => {}
			break
		case 'pending-me':
			data.text = 'Accept'
			data.disabled = false
			data.onPress = () => {}
			break
		default: break
	}

	return (
		<TouchableOpacity
			style={{
				backgroundColor: data.disabled ? '#505055' : '#202020',
				paddingHorizontal: 14,
				height: 36,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 18
			}}
			disabled={data.disabled}
			onPress={data.onPress}
		>
			<Text
				style={{
					color: data.disabled ? '#808080' : 'white',
					fontWeight: 'bold'
				}}
			>
				{data.text}
			</Text>
		</TouchableOpacity>
	)

}



function SearchRow({ user }) {

	return (
		<Cell>
			<Thumbnail
				url={user.thumbnail}
				size={76}
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal: 16
				}}
			>
				<Text
					style={{
						fontWeight: 'bold',
						color: '#202020',
						marginBottom: 4
					}}
				>
					{user.name}
				</Text>
				<Text
					style={{
						color: '#606060',
					}}
				>
					{user.username}
				</Text>
			</View>
			<SearchButton user={user} />
		</Cell>
	)
}




function SearchScreen() {
	const [query, setQuery] = useState('')

	const searchList = useGlobal(state => state.searchList)
	const searchUsers = useGlobal(state => state.searchUsers)

	useEffect(() => {
		searchUsers(query)
	}, [query]) 

	/*
	const searchList = [
		{
			thumbnail: null,
			name: 'Silly Name',
			username: 'sillyn',
			status: 'pending-them'
		},
		{
			thumbnail: null,
			name: 'Silly Something',
			username: 'sillya',
			status: 'pending-me'
		},
		{
			thumbnail: null,
			name: 'Silly Red',
			username: 'sillyb',
			status: 'connected'
		},
		{
			thumbnail: null,
			name: 'Silly Blue',
			username: 'sillyc',
			status: 'no-connection'
		}
	]
	*/

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					padding: 16,
					borderBottomWidth: 1,
					borderColor: '#f0f0f0'
				}}
			>
				<View>
					<TextInput
						style={{
							backgroundColor: '#e1e2e4',
							height: 52,
							borderRadius: 26,
							padding: 16,
							fontSize: 16,
							paddingLeft: 50
						}}
						value={query}
						onChangeText={setQuery}
						placeholder='Search...'
						placeholderTextColor='#b0b0b0'
					/>
					<FontAwesomeIcon
						icon='magnifying-glass'
						size={20}
						color='#505050'
						style={{
							position: 'absolute',
							left: 18,
							top: 17
						}}
					/>
				</View>
			</View>

			{searchList === null ? (
				<Empty
					icon='magnifying-glass'
					message='Search for friends'
					centered={false}
				/>
			) : searchList.length === 0 ? (
				<Empty
					icon='triangle-exclamation'
					message={'No users found for "' + query + '"'}
					centered={false}
				/>
			) : (
				<FlatList
					data={searchList}
					renderItem={({ item }) => (
						<SearchRow user={item} />
					)}
					keyExtractor={item => item.username}
				/>
			)}
		</SafeAreaView>
	)
}

export default SearchScreen