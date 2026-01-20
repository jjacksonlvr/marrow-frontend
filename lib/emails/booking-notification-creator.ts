interface BookingNotificationCreatorProps {
  creatorName: string;
  buyerEmail: string;
  amountGross: string;
  amountNet: string;
  platformFee: string;
  calendlyUrl: string;
}

export function getBookingNotificationCreatorEmail(props: BookingNotificationCreatorProps) {
  const { creatorName, buyerEmail, amountGross, amountNet, platformFee, calendlyUrl } = props;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
                New Booking! 💰
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0;">
                Someone just booked time with you
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Greeting -->
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Hi ${creatorName},
              </p>
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Congrats! You just received a new booking. The client has paid and is waiting to schedule a time with you.
              </p>

              <!-- Booking Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border: 2px solid #bbf7d0; border-radius: 12px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #166534; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                      Booking Details
                    </h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #14532d; font-size: 14px; padding: 8px 0;">
                          <strong>Client Email:</strong>
                        </td>
                        <td style="color: #14532d; font-size: 14px; padding: 8px 0; text-align: right;">
                          ${buyerEmail}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #14532d; font-size: 14px; padding: 8px 0;">
                          <strong>Session Price:</strong>
                        </td>
                        <td style="color: #14532d; font-size: 14px; padding: 8px 0; text-align: right;">
                          $${amountGross}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #14532d; font-size: 14px; padding: 8px 0;">
                          <strong>Platform Fee (20%):</strong>
                        </td>
                        <td style="color: #14532d; font-size: 14px; padding: 8px 0; text-align: right;">
                          -$${platformFee}
                        </td>
                      </tr>
                      <tr style="border-top: 2px solid #bbf7d0;">
                        <td style="color: #14532d; font-size: 16px; padding: 12px 0 0 0;">
                          <strong>Your Earnings:</strong>
                        </td>
                        <td style="color: #14532d; font-size: 18px; padding: 12px 0 0 0; text-align: right;">
                          <strong>$${amountNet}</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                ✅ What Happens Next
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <span style="color: #22c55e; font-size: 18px; margin-right: 12px;">1️⃣</span>
                      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                        The client will schedule a time on your Calendly calendar
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <span style="color: #22c55e; font-size: 18px; margin-right: 12px;">2️⃣</span>
                      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                        You'll receive a calendar invite from Calendly
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <span style="color: #22c55e; font-size: 18px; margin-right: 12px;">3️⃣</span>
                      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                        Show up prepared and deliver an amazing session!
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Calendly Link -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="color: #1e40af; font-size: 13px; margin: 0 0 8px 0; font-weight: 600;">
                      Your Calendly Link:
                    </p>
                    <a href="${calendlyUrl}" style="color: #2563eb; font-size: 14px; word-break: break-all; text-decoration: underline;">
                      ${calendlyUrl}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Dashboard CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="https://marrow.ideatoads.com/dashboard" style="display: inline-block; background: linear-gradient(135deg, #0a66c2, #004182); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                      View Dashboard
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Tips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px;">
                <tr>
                  <td>
                    <p style="color: #92400e; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                      💡 Pro Tips for a Great Session:
                    </p>
                    <ul style="color: #78350f; font-size: 13px; line-height: 1.6; margin: 8px 0 0 0; padding-left: 20px;">
                      <li style="margin-bottom: 6px;">Review the client's LinkedIn profile before the call</li>
                      <li style="margin-bottom: 6px;">Prepare specific examples relevant to their situation</li>
                      <li>Follow up with resources or action items after the session</li>
                    </ul>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 13px; margin: 0 0 16px 0;">
                💳 Your earnings will be available for payout after you complete your Stripe Connect setup
              </p>
              <div style="margin-bottom: 16px;">
                <a href="https://marrow.ideatoads.com/dashboard" style="color: #0a66c2; text-decoration: none; font-size: 13px; font-weight: 600; margin-right: 16px;">
                  Dashboard
                </a>
                <a href="https://marrow.ideatoads.com/settings" style="color: #0a66c2; text-decoration: none; font-size: 13px; font-weight: 600;">
                  Settings
                </a>
              </div>
              <p style="color: #cbd5e1; font-size: 11px; margin: 0;">
                Powered by Marrow • Professional consultation marketplace
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
New Booking!

Hi ${creatorName},

Congrats! You just received a new booking.

BOOKING DETAILS:
- Client Email: ${buyerEmail}
- Session Price: $${amountGross}
- Platform Fee (20%): -$${platformFee}
- Your Earnings: $${amountNet}

WHAT HAPPENS NEXT:
1. The client will schedule a time on your Calendly calendar
2. You'll receive a calendar invite from Calendly
3. Show up prepared and deliver an amazing session!

Your Calendly Link: ${calendlyUrl}

View your dashboard: https://marrow.ideatoads.com/dashboard

Pro Tips:
- Review the client's LinkedIn profile before the call
- Prepare specific examples relevant to their situation
- Follow up with resources or action items after the session

---
Marrow
Professional consultation marketplace
https://marrow.ideatoads.com
  `.trim();

  return { html, text };
}