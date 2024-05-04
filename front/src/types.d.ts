export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phone: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface UserTypes {
    _id: string;
    username: string;
    token: string;
    displayName: string;
    phone: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        },
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterResponse {
    message: string;
    user: UserTypes;
}

export interface MainErr {
    error: string;
}

export interface ProductTypes {
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
}

export interface ProductsItem {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
    user: {
        _id: string;
        displayName: string;
        phone: string;
    }
}