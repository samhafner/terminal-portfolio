export type Command = {
    cmd: string;
    attr: boolean;
    desc: string;
    wait?: boolean;
    hidden?: boolean;
};