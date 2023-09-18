import EncryptedStorage from "react-native-encrypted-storage"
import utils from "./utils"


async function set(key, object) {
	//utils.log(key)
	//utils.log(object)
	try {
		await EncryptedStorage.setItem(key, JSON.stringify(object))
	} catch (error) {
		console.log('secure.set:', error)
	}
}

async function get(key) {
	try {
		const data = await EncryptedStorage.getItem(key)
		if (data !== undefined) {
			return JSON.parse(data)
		}
	} catch (error) {
		console.log('secure.get:', error)
	}
}

async function remove(key) {
	try {
		await EncryptedStorage.removeItem(key)
	} catch (error) {
		console.log('secure.remove:', error)
	}
}

async function wipe() {
	try {
		await EncryptedStorage.clear()
	} catch (error) {
		console.log('secure.wipe:', error)
	}
}

export default { set, get, remove, wipe }