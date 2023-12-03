import { IProfile } from "./profile.interface";

export interface IUserData {
	email: string;
	id: number;
	profiles: IProfile;
}
