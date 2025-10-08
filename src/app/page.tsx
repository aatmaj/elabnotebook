
import { redirect } from 'next/navigation';

export default function Page() {
  // Default to the landing page
  redirect('/landing');
}
