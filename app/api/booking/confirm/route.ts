import { NextRequest, NextResponse } from "next/server";
import { confirmBookingAtomic, markEmailSent } from "@/lib/booking";
import { sendCustomerConfirmedEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Ungültiger Token." }, { status: 400 });
    }

    const { success, booking } = await confirmBookingAtomic(token);

    if (!success || !booking) {
      return NextResponse.json(
        {
          error:
            "Diese Anfrage konnte nicht bestätigt werden. Sie wurde bereits bearbeitet, oder der Link ist abgelaufen.",
        },
        { status: 409 }
      );
    }

    const emailResult = await sendCustomerConfirmedEmail(booking);
    if (emailResult.success) {
      await markEmailSent(booking.id, "confirm_email_sent");
    }

    return NextResponse.json({
      success: true,
      customerEmailSent: emailResult.success,
      booking: {
        firstName: booking.first_name,
        lastName: booking.last_name,
        service: booking.service,
        date: booking.requested_date,
        time: booking.requested_time,
        email: booking.email,
      },
    });
  } catch (err) {
    console.error("Fehler bei Terminbestätigung:", err);
    return NextResponse.json(
      { error: "Es ist ein unerwarteter Fehler aufgetreten." },
      { status: 500 }
    );
  }
}
