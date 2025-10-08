import { redirect } from 'next/navigation';

export default function Page() {
  // Default to the scale-up predictor page
  redirect('/scale-up-predictor');
}
