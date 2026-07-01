import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'Hitayu Clinic Appointments <onboarding@resend.dev>';
const TO_ADDRESS = 'hitayusurgicals2026@gmail.com';

const emailHtml = (fullName: string, phone: string, condition: string, preferredDate: string, message: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
    <div style="background: #2B7ABB; padding: 20px 24px; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 22px;">New Appointment Request</h1>
      <p style="color: #d0e8f5; margin: 4px 0 0; font-size: 14px;">Hitayu Surgical Clinic</p>
    </div>
    <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 40%;">Patient Name</td>
          <td style="padding: 12px 0; color: #6b7280;">${fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 12px 0; font-weight: bold; color: #374151;">Phone Number</td>
          <td style="padding: 12px 0; color: #6b7280;">${phone}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 12px 0; font-weight: bold; color: #374151;">Health Concern</td>
          <td style="padding: 12px 0; color: #6b7280;">${condition}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 12px 0; font-weight: bold; color: #374151;">Preferred Date</td>
          <td style="padding: 12px 0; color: #6b7280;">${preferredDate || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
          <td style="padding: 12px 0; color: #6b7280;">${message || 'No additional message'}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #f0f9e1; border-radius: 8px; border-left: 4px solid #9BD22A;">
        <p style="margin: 0; color: #374151; font-size: 14px;">Please follow up with the patient as soon as possible during clinic hours.</p>
      </div>
    </div>
    <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">This email was sent from the Hitayu Surgical Clinic website.</p>
  </div>
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, condition, preferredDate, message } = body;

    if (!fullName || !phone || !condition) {
      return NextResponse.json({ error: 'Full name, phone, and health concern are required.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      subject: `New Appointment Request — ${fullName} (${condition})`,
      html: emailHtml(fullName, phone, condition, preferredDate, message),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
