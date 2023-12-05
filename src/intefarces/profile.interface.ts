import { IPost } from "./post.interface";
import { IUserData } from "./user.interface";

export interface IProfile {
	bio: string;
	user?: IUserData;
	createdAt: string;
	genre: string;
	id: number;
	image: string | null;
	phone: string;
	posts: IPost[];
	updatedAt: string;
	userId: number;
}

export interface ICreateProfile {
	name: string;
	userId: number;
}
