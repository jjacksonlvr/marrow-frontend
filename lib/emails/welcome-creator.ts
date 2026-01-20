interface WelcomeCreatorProps {
  creatorName: string;
  linkedinSlug: string;
  profileUrl: string;
}

export function getWelcomeCreatorEmail(props: WelcomeCreatorProps) {
  const { creatorName, linkedinSlug, profileUrl } = props;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Marrow</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a66c2 0%, #004182 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px 0;">
                Welcome to Marrow! 🎉
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0;">
                Your profile is live and ready to earn
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
                Congratulations! Your Marrow profile is now live. You're ready to start monetizing your expertise.
              </p>

              <!-- Quick Start Steps -->
              <h2 style="color: #1e293b; font-size: 20px; font-weight: 700; margin: 0 0 20px 0;">
                🚀 Get Your First Booking
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 16px; background-color: #f8fafc; border-left: 4px solid #0a66c2; margin-bottom: 12px; border-radius: 4px;">
                    <div style="display: flex; align-items: flex-start;">
                      <span style="color: #0a66c2; font-size: 24px; font-weight: 700; margin-right: 16px;">1</span>
                      <div>
                        <p style="color: #1e293b; font-size: 15px; font-weight: 600; margin: 0 0 6px 0;">
                          Install the Chrome Extension
                        </p>
                        <p style="color: #64748b; font-size: 14px; margin: 0;">
                          Add a booking button to your LinkedIn profile (takes 30 seconds)
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="height: 12px;"></td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #f8fafc; border-left: 4px solid #0a66c2; margin-bottom: 12px; border-radius: 4px;">
                    <div style="display: flex; align-items: flex-start;">
                      <span style="color: #0a66c2; font-size: 24px; font-weight: 700; margin-right: 16px;">2</span>
                      <div>
                        <p style="color: #1e293b; font-size: 15px; font-weight: 600; margin: 0 0 6px 0;">
                          Share Your Marrow Profile
                        </p>
                        <p style="color: #64748b; font-size: 14px; margin: 0;">
                          Post on LinkedIn, Twitter, or share with your network
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="height: 12px;"></td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 4px;">
                    <div style="display: flex; align-items: flex-start;">
                      <span style="color: #22c55e; font-size: 24px; font-weight: 700; margin-right: 16px;">3</span>
                      <div>
                        <p style="color: #1e293b; font-size: 15px; font-weight: 600; margin: 0 0 6px 0;">
                          Start Earning!
                        </p>
                        <p style="color: #64748b; font-size: 14px; margin: 0;">
                          Get notified when someone books, deliver great sessions, get paid
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Profile URL -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
                <tr>
                  <td>
                    <p style="color: #1e40af; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">
                      📱 Your Marrow Profile:
                    </p>
                    <a href="${profileUrl}" style="color: #2563eb; font-size: 15px; font-weight: 600; word-break: break-all; text-decoration: underline;">
                      ${profileUrl}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="https://marrow.ideatoads.com/dashboard" style="display: inline-block; background: linear-gradient(135deg, #0a66c2, #004182); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 700; font-size: 16px;">
                      Go to Dashboard
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="https://chrome.google.com/webstore" style="display: inline-block; background-color: #ffffff; color: #0a66c2; border: 2px solid #0a66c2; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                      Download Extension
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Tips -->
              <h3 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">
                💡 Tips for Success
              </h3>
              <ul style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 24px;">
                <li>Share your Marrow link in your LinkedIn About section</li>
                <li>Post about your availability weekly to stay top of mind</li>
                <li>Respond quickly when someone books - it builds trust</li>
                <li>Ask satisfied clients for LinkedIn recommendations</li>
              </ul>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 13px; margin: 0 0 16px 0;">
                Questions? Reply to this email or visit our help center
              </p>
              <div style="margin-bottom: 16px;">
                <a href="https://marrow.ideatoads.com/dashboard" style="color: #0a66c2; text-decoration: none; font-size: 13px; font-weight: 600; margin-right: 16px;">
                  Dashboard
                </a>
                <a href="${profileUrl}" style="color: #0a66c2; text-decoration: none; font-size: 13px; font-weight: 600;">
                  View Profile
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
Welcome to Marrow!

Hi ${creatorName},

Congratulations! Your Marrow profile is now live. You're ready to start monetizing your expertise.

GET YOUR FIRST BOOKING:

1. Install the Chrome Extension
   Add a booking button to your LinkedIn profile (takes 30 seconds)

2. Share Your Marrow Profile
   Post on LinkedIn, Twitter, or share with your network

3. Start Earning!
   Get notified when someone books, deliver great sessions, get paid

Your Marrow Profile: ${profileUrl}

TIPS FOR SUCCESS:
- Share your Marrow link in your LinkedIn About section
- Post about your availability weekly to stay top of mind
- Respond quickly when someone books - it builds trust
- Ask satisfied clients for LinkedIn recommendations

Go to Dashboard: https://marrow.ideatoads.com/dashboard
Download Extension: https://chrome.google.com/webstore

Questions? Reply to this email anytime.

---
Marrow
Professional consultation marketplace
https://marrow.ideatoads.com
  `.trim();

  return { html, text };
}