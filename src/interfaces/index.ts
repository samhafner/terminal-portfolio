export type Command = {
    cmd: string;
    args: boolean;
    desc: string;
    wait?: boolean;
    hidden?: boolean;
};