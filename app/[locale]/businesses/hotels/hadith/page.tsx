import { redirect } from "next/navigation";
import { HOTEL_WEBSITES } from "@/lib/hotel-websites";

/** Send the former EBI Hadith Hotel page to the property's official website. */
export default function HadithHotelRedirect() {
  redirect(HOTEL_WEBSITES.hadith);
}
