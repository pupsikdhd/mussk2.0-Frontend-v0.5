export type LoginResult =
    | { status: 'success'; token: string }
    | { status: 'mfa'; token: string }
    | { status: 'unauthorized' };

