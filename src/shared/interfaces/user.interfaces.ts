
export interface SocialCreds {
  id: string;
  email?: string;
}

export interface Social {
  provider: string;
  creds: SocialCreds;
}
