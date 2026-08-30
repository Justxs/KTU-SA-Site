import { redirect } from 'next/navigation';

export default function LocalizedCatchAllPage() {
  redirect('/en');
}
