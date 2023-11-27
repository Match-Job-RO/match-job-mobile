import { IPost } from "./post.interface";

export interface IProfile {
	bio: string;
	name: string;
	createdAt: string;
	genre: string;
	id: number;
	image: string | null;
	phone: string;
	posts: IPost[];
	updatedAt: string;
	userId: number;
}
