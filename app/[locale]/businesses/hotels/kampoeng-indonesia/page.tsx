import { redirect } from "next/navigation";
import { HOTEL_WEBSITES } from "@/lib/hotel-websites";

/** Send the former EBI Kampoeng page to the property's official website. */
export default function KampoengHotelRedirect() {
  redirect(HOTEL_WEBSITES.kampoengIndonesia);
}
