import { IProfile } from "./profile.interface";

export interface IPost {
	id?: number;
	title: string;
	postType: IPostType;
	content: string;
	createdAt?: string;
	updatedAt?: string;
	profile?: IProfile;
	profileId: number;
}

export interface IPostRequest {
	id?: number;
	profileId: number;
	token: string;
}

export interface IPostCard {
	user: string;
	postType: IPostType;
	title: string;
	phone: string;
	content: string;
}

export enum IPostType {
	Job = "Job",
	Service = "Service",
}
