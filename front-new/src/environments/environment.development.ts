import { stagger } from '@angular/animations';

export const environment = {
  sheetsId: "",
  production: true,
  googleClient: '',
  apiKey: "",
  url: 'http://localhost:3000',
  animations: {
    transition_time: 15000,
    in: {
      scale: 0.7,
      stagger: 500,
      ease: 2000
    },
    out: {
      scale: 1,
      stagger: 600,
      ease: 1000
    }
  },
  developers: ['ekoziol@ciandt.com', 'alvarof@ciandt.com']
};
