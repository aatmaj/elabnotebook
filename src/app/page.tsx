import { redirect } from 'next/navigation';

export default function Page() {
  // Default to the landing page for all initial traffic
  redirect('/landing');
}
