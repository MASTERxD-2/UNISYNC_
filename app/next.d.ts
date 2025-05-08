// next.d.ts
import { IronSession } from 'iron-session';

declare module 'next' {
  interface NextApiRequest {
    session: IronSession;
  }
}
