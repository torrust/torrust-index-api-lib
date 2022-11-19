export class Settings {
    website_name?: string;
    tracker_url?: string;
    tracker_mode?: TrackerMode;
    email_on_signup?: Requirement;
}

export enum TrackerMode {
    Public,
    Private,
    Whitelisted,
    PrivateWhitelisted
}

export enum Requirement {
    None,
    Optional,
    Required
}
