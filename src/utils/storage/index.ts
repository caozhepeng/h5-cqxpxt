class StorageFn {
	ls: any;
	ss: any;

	constructor() {
		this.ls = window.localStorage;
		this.ss = window.sessionStorage;
	}
	/*-----------------cookie---------------------*/
	/*设置cookie*/
	setCookie(name: string, value: any, day: any) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + day);
		document.cookie = name + "=" + value + ";expires=" + oDate;
	}

	/*获取cookie*/
	getCookie(name: string) {
		var arr = document.cookie.split("; ");
		for (var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split("=");
			if (arr2[0] == name) {
				return arr2[1];
			}
		}
		return "";
	}

	/*删除cookie*/
	removeCookie(name: string) {
		this.setCookie(name, 1, -1);
	}
	/*-----------------localStorage---------------------*/
	/*设置localStorage*/
	setLocal(key: string, val: any) {
		this.ls.setItem(key, JSON.stringify(val));
	}

	/*获取localStorage*/
	getLocal(key: string) {
		if (key) return JSON.parse(this.ls.getItem(key));
		return null;
	}
	/*移除localStorage*/
	removeLocal(key: string) {
		this.ls.removeItem(key);
	}
	/*移除所有localStorage*/

	clearLocal() {
		this.ls.clear();
	}

	/*-----------------sessionStorage---------------------*/

	/*设置sessionStorage*/
	setSession(key: string, val: any) {
		this.ss.setItem(key, JSON.stringify(val));
	}

	/*获取sessionStorage*/
	getSession(key: string) {
		if (key) return JSON.parse(this.ss.getItem(key));
		return null;
	}

	/*移除sessionStorage*/
	removeSession(key: string) {
		this.ss.removeItem(key);
	}

	/*移除所有sessionStorage*/

	clearSession() {
		this.ss.clear();
	}
}

//所有key
const key_base = "h5_cqxpxt_"; //基础前缀

const key_userInfo = key_base + "UserInfo";
const key_tokenInfo = key_base + "tokenInf0";
const key_RefreshTokenInfo = key_base + "RefreshTokenInfo";

const storageFn = new StorageFn(); //初始化

/**
 * [保存用户信息]
 * @param {[userInfo]} userInfo  [用户信息]
 */
export function saveUserInfo(userInfo: any) {
	storageFn.setLocal(key_userInfo, userInfo);
}
/**
 * [得到用户信息]
 */
export function getUserInfo() {
	return storageFn.getLocal(key_userInfo) || {};
}

// 保存token
export function saveToken(data: string) {
	storageFn.setLocal(key_tokenInfo, data);
}

// 获取token
export function getToken() {
	return storageFn.getLocal(key_tokenInfo);
}

// 保存RefreshToken
export function saveRefreshToken(data: string) {
	storageFn.setLocal(key_RefreshTokenInfo, data);
}

// 获取RefreshToken
export function getRefreshToken() {
	return storageFn.getLocal(key_RefreshTokenInfo);
}

export function clearAll() {
	storageFn.clearSession();
	storageFn.clearLocal();
}
