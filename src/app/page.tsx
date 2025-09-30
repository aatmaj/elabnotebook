import { redirect } from 'next/navigation';

export default function Page() {
  // Default to the portfolio view for leadership
  redirect('/molecules');
}
