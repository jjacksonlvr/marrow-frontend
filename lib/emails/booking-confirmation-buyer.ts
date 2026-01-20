interface BookingConfirmationBuyerProps {
  creatorName: string;
  creatorTitle: string;
  amountPaid: string;
  calendlyUrl: string;
  buyerEmail: string;
}

export function getBookingConfirmationBuyerEmail(props: BookingConfirmationBuyerProps) {
  const { creatorName, creatorTitle, amountPaid, calendlyUrl, buyerEmail } = props;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Session Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a66c2 0%, #004182 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
                Session Confirmed! 🎉
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0;">
                Your booking with ${creatorName} is all set
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Confirmation Message -->
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Hi there,
              </p>
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Great news! Your consultation session with <strong>${creatorName}</strong> has been confirmed.
              </p>

              <!-- Session Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f9ff; border: 2px solid #bae6fd; border-radius: 12px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #0369a1; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                      Session Details
                    </h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0;">
                          <strong>Expert:</strong>
                        </td>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0; text-align: right;">
                          ${creatorName}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0;">
                          <strong>Session:</strong>
                        </td>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0; text-align: right;">
                          ${creatorTitle}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0;">
                          <strong>Amount Paid:</strong>
                        </td>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0; text-align: right;">
                          <strong>$${amountPaid}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0;">
                          <strong>Duration:</strong>
                        </td>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0; text-align: right;">
                          30 minutes
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                📅 Next Step: Schedule Your Time
              </h3>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                Click the button below to choose a time that works for you on ${creatorName}'s calendar:
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="${calendlyUrl}" style="display: inline-block; background: linear-gradient(135deg, #0a66c2, #004182); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 700; font-size: 16px;">
                      Schedule Your Session
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Help Text -->
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 8px 0;">
                <strong>Can't find a time?</strong> Reply to this email and we'll help coordinate.
              </p>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
                <strong>Need to reschedule?</strong> No problem - just pick a new time on the calendar.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0;">
                🔒 Your payment was processed securely by Stripe
              </p>
              <p style="color: #cbd5e1; font-size: 12px; margin: 0 0 16px 0;">
                Confirmation sent to ${buyerEmail}
              </p>
              <div style="margin-bottom: 16px;">
                <a href="https://marrow.ideatoads.com" style="color: #0a66c2; text-decoration: none; font-size: 13px; font-weight: 600;">
                  Visit Marrow
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
Session Confirmed!

Your consultation session with ${creatorName} has been confirmed.

SESSION DETAILS:
- Expert: ${creatorName}
- Session: ${creatorTitle}
- Amount Paid: $${amountPaid}
- Duration: 30 minutes

NEXT STEP: Schedule Your Time

Visit ${creatorName}'s calendar to choose a time that works for you:
${calendlyUrl}

Questions? Reply to this email and we'll help.

---
Marrow
Professional consultation marketplace
https://marrow.ideatoads.com
  `.trim();

  return { html, text };
}