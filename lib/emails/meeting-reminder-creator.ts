interface MeetingReminderCreatorProps {
  creatorName: string;
  buyerEmail: string;
  meetingTime: string;
  meetingUrl: string;
}

export function getMeetingReminderCreatorEmail(props: MeetingReminderCreatorProps) {
  const { creatorName, buyerEmail, meetingTime, meetingUrl } = props;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Session Tomorrow</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
                Session Tomorrow! 📅
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0;">
                Time to prepare for your consultation
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Hi ${creatorName},
              </p>
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                You have a consultation session coming up tomorrow. Here are the details:
              </p>

              <!-- Session Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf5ff; border: 2px solid #e9d5ff; border-radius: 12px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #6b21a8; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                      📋 Session Details
                    </h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #581c87; font-size: 14px; padding: 8px 0;">
                          <strong>Client:</strong>
                        </td>
                        <td style="color: #581c87; font-size: 14px; padding: 8px 0; text-align: right;">
                          ${buyerEmail}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #581c87; font-size: 14px; padding: 8px 0;">
                          <strong>When:</strong>
                        </td>
                        <td style="color: #581c87; font-size: 14px; padding: 8px 0; text-align: right;">
                          <strong>${meetingTime}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #581c87; font-size: 14px; padding: 8px 0;">
                          <strong>Duration:</strong>
                        </td>
                        <td style="color: #581c87; font-size: 14px; padding: 8px 0; text-align: right;">
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
                    <a href="${meetingUrl}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 700; font-size: 16px;">
                      Join Session
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Preparation Checklist -->
              <h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                ✅ Pre-Session Checklist
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                      ☐ Review the client's LinkedIn profile and background
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                      ☐ Prepare 2-3 relevant examples or case studies
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                      ☐ Test your camera and microphone
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                      ☐ Find a quiet space with good lighting
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                      ☐ Have resources ready to share (links, documents, etc.)
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Pro Tips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="color: #065f46; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                      💡 Pro Tips:
                    </p>
                    <ul style="color: #047857; font-size: 13px; line-height: 1.6; margin: 8px 0 0 0; padding-left: 20px;">
                      <li style="margin-bottom: 6px;">Start with a brief introduction and set expectations</li>
                      <li style="margin-bottom: 6px;">Ask questions to understand their specific needs</li>
                      <li style="margin-bottom: 6px;">Leave 5 minutes at the end for Q&A and next steps</li>
                      <li>Follow up after with a summary email</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Calendar Link -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 8px; padding: 16px;">
                <tr>
                  <td>
                    <p style="color: #1e40af; font-size: 13px; margin: 0;">
                      <strong>Meeting link:</strong><br>
                      <a href="${meetingUrl}" style="color: #2563eb; font-size: 14px; word-break: break-all; text-decoration: underline;">
                        ${meetingUrl}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 13px; margin: 0 0 16px 0;">
                You've got this! 💪
              </p>
              <div style="margin-bottom: 16px;">
                <a href="https://marrow.ideatoads.com/dashboard" style="color: #0a66c2; text-decoration: none; font-size: 13px; font-weight: 600;">
                  View Dashboard
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
Session Tomorrow!

Hi ${creatorName},

You have a consultation session coming up tomorrow.

SESSION DETAILS:
- Client: ${buyerEmail}
- When: ${meetingTime}
- Duration: 30 minutes

Join Session: ${meetingUrl}

PRE-SESSION CHECKLIST:
☐ Review the client's LinkedIn profile and background
☐ Prepare 2-3 relevant examples or case studies
☐ Test your camera and microphone
☐ Find a quiet space with good lighting
☐ Have resources ready to share (links, documents, etc.)

PRO TIPS:
- Start with a brief introduction and set expectations
- Ask questions to understand their specific needs
- Leave 5 minutes at the end for Q&A and next steps
- Follow up after with a summary email

You've got this!

---
Marrow
https://marrow.ideatoads.com/dashboard
  `.trim();

  return { html, text };
}