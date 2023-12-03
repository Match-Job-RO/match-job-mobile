import { IPost } from "../intefarces/post.interface";

export type TProfile = {
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
};
