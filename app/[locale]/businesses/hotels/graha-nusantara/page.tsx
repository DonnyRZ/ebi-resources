import { redirect } from "next/navigation";
import { HOTEL_WEBSITES } from "@/lib/hotel-websites";

/** Graha Nusantara is hidden from listings; keep its legacy URL forwarding. */
export default function GrahaNusantaraRedirect() {
  redirect(HOTEL_WEBSITES.grahaNusantara);
}
