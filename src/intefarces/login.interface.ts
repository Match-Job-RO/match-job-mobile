export interface ILoginData {
	email: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
	userId: number;
}
