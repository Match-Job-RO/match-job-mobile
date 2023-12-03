export interface IPost {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	userId: number;
}

export interface IPostCard {
	user: string;
	title: string;
	content: string;
}
