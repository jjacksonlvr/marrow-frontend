interface MeetingReminderBuyerProps {
  creatorName: string;
  creatorTitle: string;
  meetingTime: string; // e.g., "Tomorrow at 2:00 PM EST"
  meetingUrl: string;
  buyerEmail: string;
}

export function getMeetingReminderBuyerEmail(props: MeetingReminderBuyerProps) {
  const { creatorName, creatorTitle, meetingTime, meetingUrl, buyerEmail } = props;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meeting Reminder</title>
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
                Your Session is Tomorrow! ⏰
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0;">
                Don't forget your consultation with ${creatorName}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Hi there,
              </p>
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                This is a friendly reminder about your upcoming consultation session.
              </p>

              <!-- Meeting Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f9ff; border: 2px solid #bae6fd; border-radius: 12px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #0369a1; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                      📅 Meeting Details
                    </h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0;">
                          <strong>With:</strong>
                        </td>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0; text-align: right;">
                          ${creatorName}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0;">
                          <strong>Topic:</strong>
                        </td>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0; text-align: right;">
                          ${creatorTitle}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0;">
                          <strong>When:</strong>
                        </td>
                        <td style="color: #0c4a6e; font-size: 14px; padding: 8px 0; text-align: right;">
                          <strong>${meetingTime}</strong>
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

              <!-- Join Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <a href="${meetingUrl}" style="display: inline-block; background: linear-gradient(135deg, #0a66c2, #004182); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 700; font-size: 16px;">
                      Join Meeting
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Preparation Tips -->
              <h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                💡 How to Prepare
              </h3>
              <ul style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0 0 24px 0; padding-left: 24px;">
                <li>Write down your top 3 questions beforehand</li>
                <li>Have pen and paper ready to take notes</li>
                <li>Join 2-3 minutes early to test your connection</li>
                <li>Be in a quiet space with good internet</li>
              </ul>

              <!-- Need to Reschedule -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px;">
                <tr>
                  <td>
                    <p style="color: #92400e; font-size: 14px; margin: 0;">
                      <strong>Need to reschedule?</strong> Please give at least 24 hours notice by replying to this email.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0;">
                See you soon! 👋
              </p>
              <p style="color: #cbd5e1; font-size: 12px; margin: 0 0 16px 0;">
                Reminder sent to ${buyerEmail}
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
Your Session is Tomorrow!

Hi there,

This is a friendly reminder about your upcoming consultation session.

MEETING DETAILS:
- With: ${creatorName}
- Topic: ${creatorTitle}
- When: ${meetingTime}
- Duration: 30 minutes

Join Meeting: ${meetingUrl}

HOW TO PREPARE:
- Write down your top 3 questions beforehand
- Have pen and paper ready to take notes
- Join 2-3 minutes early to test your connection
- Be in a quiet space with good internet

Need to reschedule? Please give at least 24 hours notice by replying to this email.

See you soon!

---
Marrow
https://marrow.ideatoads.com
  `.trim();

  return { html, text };
}