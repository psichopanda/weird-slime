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
  profile_completion: number;
  birthday_date?: Date | null;
  badge_photo?: string;
  show_birthday: boolean;
}
