export type RegisterResult =
    | { status: 'success'; token: string }
    | { status: 'bad-request' };

