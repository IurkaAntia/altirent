import Link from "next/link";

export default function AllButton({
  hrefTo,
  text = "SEE ALL",
}: {
  hrefTo: string;
  text?: string;
}) {
  return (
    <Link
      href={`/${hrefTo}`}
      className="relative sm:mt-10 px-6 sm:px-8 py-3 bg-green-1000 text-white overflow-hidden rounded-lg group text-sm sm:text-base"
    >
      <span className="absolute inset-0 bg-secondary transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-all duration-1000"></span>
      <span className="relative transition-colors duration-100">{text}</span>
    </Link>
  );
}
