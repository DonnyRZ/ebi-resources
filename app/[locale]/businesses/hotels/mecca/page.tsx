import { redirect } from "next/navigation";
import { HOTEL_WEBSITES } from "@/lib/hotel-websites";

/** Send the former EBI Mecca Hotel page to the property's official website. */
export default function MeccaHotelRedirect() {
  redirect(HOTEL_WEBSITES.mecca);
}
