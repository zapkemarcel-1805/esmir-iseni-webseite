import { NextRequest, NextResponse } from "next/server";
import { declineBookingAtomic, markEmailSent } from "@/lib/booking";
import { sendCustomerDeclinedEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Ungültiger Token." }, { status: 400 });
    }

    const { success, booking } = await declineBookingAtomic(token);

    if (!success || !booking) {
      return NextResponse.json(
        {
          error:
            "Diese Anfrage konnte nicht abgelehnt werden. Sie wurde bereits bearbeitet, oder der Link ist abgelaufen.",
        },
        { status: 409 }
      );
    }

    const emailResult = await sendCustomerDeclinedEmail(booking);
    if (emailResult.success) {
      await markEmailSent(booking.id, "decline_email_sent");
    }

    return NextResponse.json({
      success: true,
      customerEmailSent: emailResult.success,
      booking: {
        firstName: booking.first_name,
        lastName: booking.last_name,
      },
    });
  } catch (err) {
    console.error("Fehler bei Terminablehnung:", err);
    return NextResponse.json(
      { error: "Es ist ein unerwarteter Fehler aufgetreten." },
      { status: 500 }
    );
  }
}
