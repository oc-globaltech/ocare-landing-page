# O'Care Workspace

Mobile-first chat and wellbeing app with supporting admin dashboard.

## Structure
- `mobile/` – Expo (React Native) app for students, teachers, parents, and coordinators.
- `admin-dashboard/` – Next.js web dashboard for admins and coordinators.

## Prerequisites
- Node 18+ and npm.
- Expo CLI (`npm install -g expo-cli`) if you want the global helper, otherwise `npx expo`.
- Firebase project keys for auth/storage/messaging.

## Mobile (Expo)
1. Copy `mobile/.env.example` to `mobile/.env` and fill your Firebase keys (prefixed with `EXPO_PUBLIC_` for Expo).
2. Install deps (already installed): `cd mobile && npm install`.
3. Start in Expo dev: `npm start` (choose iOS/Android/Web).
4. Screens included: login, feed, messaging, diary, and profile with role-aware copy; Firebase bootstrap lives in `src/services/firebase.ts`.

## Admin Dashboard (Next.js)
1. `cd admin-dashboard && npm install` (already installed in this setup).
2. Dev server: `npm run dev` then open the printed localhost URL.
3. Landing view shows role counts, alert composer CTA, and recent activity; extend with real data + Firebase/Admin SDK as needed.

## Notes
- Brand color is `#f77000` and shared between apps.
- Sign-in flow is mocked for now; replace `onSignIn` in `mobile/App.tsx` with Firebase Auth.
- Keep credentials out of git; `.env` is ignored.
