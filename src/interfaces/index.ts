export type Command = {
    cmd: string;
    args: boolean;
    desc: string;
    wait?: boolean;
    hidden?: boolean;
};

export interface JokeCommon {
    error: boolean;
    category: string;
    type: string;
    flags: {
        nsfw: boolean;
        religious: boolean;
        political: boolean;
        racist: boolean;
        sexist: boolean;
        explicit: boolean;
    };
    id: number;
    safe: boolean;
    lang: string;
}
export interface JokeSingle extends JokeCommon {
    type: "single";
    joke: string;
}
export interface JokeTwoPart extends JokeCommon {
    type: "twopart";
    setup: string;
    delivery: string;
}

export interface Quote {
    _id: string;
    content: string;
    author: string;
    tags: string[];
    authorSlug: string;
    length: number;
    dateAdded: string;
    dateModified: string;
}

export interface Project {
    name: string;
    tech: string[];
    year: string;
    description: string;
    url?: {
        code?: string;
        live?: string;
    };
}