export interface PeopleInterface {
  id: string;
  name: string;
  picture: string;
  email_cit: string;
  engagement: string;
  first_name: string;
  login: string;
  primary_skills: string;
  start_date: Date;
  team: string;
  profile_completion: number
}

export interface PeopleInterfaceDTO {
  _id: string
  Name: string
  "Start Date": string
  Engagement: string
  Team: string
  "Email CI&T": string
  Login: string
  "Primary Skills": string
  "First Name": string
  id: string;
  picture: string;
}
