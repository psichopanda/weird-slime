export interface PeopleInterface {
  id: string;
  name: string;
  picture: string;
  email_cit: string;
  engagement: string;
  first_name: string;
  login: string;
  primary_skills: string;
  start_date: Date | null;
  team: string;
  profile_completion: number;
  birthday_date?: Date | null;
  badge_photo?: string;
  show_birthday: boolean;
  new_employ: boolean;
  badges: BadgeInterface[]
}

export interface BadgeInterface {
  name: string;
  slug: string;
  image: string;
}
