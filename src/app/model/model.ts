export interface User {
    user: {
        "email": string;
        "token": string;
        "username": string;
        "bio": string;
        "image": string;
    }
}

export interface Author {
    bio: String;
    following: Boolean;
    image: String;
    username: String;
}

export interface Article {
    author: Author;
    body: string;
    createdAt: String;
    description: String;
    favorited: Boolean;
    favoritesCount: number;
    slug: String;
    tagList: String[];
    title: String;
    updatedAt: String;
}

export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
}

export interface Profile {
    bio: string;
    image: string;
    username: string;
    following: boolean;
}