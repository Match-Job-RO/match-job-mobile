import { IPost } from "../intefarces/post.interface";

export async function createPost(postData: IPost, token: string) {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
	const bearerToken = `Bearer ${token}`;
	const response = await fetch(`${baseUrl}/post`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearerToken,
		},
		body: JSON.stringify(postData),
	});

	if (!response.ok) {
		console.log(response.json());
		throw new Error("Erro ao tentar criar o post");
	}

	const createdPostData = response.json();

	return createdPostData;
}

export async function getPostList(token: string) {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
	const bearerToken = `Bearer ${token}`;
	const response = await fetch(`${baseUrl}/post`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearerToken,
		},
	});

	if (!response.ok) {
		console.log(response.json());
		throw new Error("Nenhum post encontrado");
	}

	const postList = response.json();

	return postList;
}

export async function getPostById(id: number, token: string) {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
	const bearerToken = `Bearer ${token}`;
	const response = await fetch(`${baseUrl}/post/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearerToken,
		},
	});

	if (!response.ok) {
		console.log(response.json());
		throw new Error("Nenhum post encontrado");
	}

	const postList = response.json();

	return postList;
}

export async function editPost(postData: IPost, token: string) {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
	const bearerToken = `Bearer ${token}`;
	const response = await fetch(`${baseUrl}/post/${postData.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearerToken,
		},
		body: JSON.stringify(postData),
	});

	if (!response.ok) {
		console.log(response.json());
		throw new Error("Nenhum post encontrado");
	}

	const postList = response.json();

	return postList;
}
