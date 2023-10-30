export function generateVerificationEmail (name: string, code: string, email: string): string {
  const verificationLink = `http://localhost:3000/verify-email/?code=${code}&email=${email}`
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Email</title>
  <style>
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background-color: #f6f6f6;
    }

    * {
      font-family: sans-serif;
      font-size: 14px;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
      border: none;
      -ms-interpolation-mode: bicubic;
      max-width: 100%;
    }

    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
    a {
      text-decoration: none;
    }

    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
      margin: 0 !important;
    }

    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    /* What it does: Fixes webkit padding issue. */
    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],
    /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
    .a6S {
      display: none !important;
      opacity: 0.01 !important;
    }

    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
      color: inherit !important;
    }

    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img+div {
      display: none !important;
    }

  </style>
</head>

<body>
  <span class="preheader"
    style="color: transparent;display: none;overflow: hidden;opacity: 0;">Construction
    Calculator - Verify Email Address</span>
  <div class="email-container" style="max-width: 600px; margin: 0 auto;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0"
      align="center" width="100%" style="margin: auto;">
      <!-- email-header -->
      <tr>
        <td>
          <!-- <img src="./image-1.webp" alt="email-hero-image"
            style="width: 100%;object-fit: cover;"> -->
          <div class="bg"
            style="content: ''; background-color: #2fa4f8; width: 100%; height: 5rem;">
          </div>
        </td>
      </tr>
      <!-- email-body -->
      <tr>
        <td style="padding: 1rem;">
          <h2>Hi ${name},</h2>
          <p style="width: inherit">Welcome to Construction Calculator. Please
            verify your email address
            to continue using the service. Click on the link below to verify.
          </p>
          <div
            style="margin: 4rem auto;align-items: center;text-align: center;">
            <a href="${verificationLink}"
              style="text-decoration: none; background-color: #2fa4f8;color: #f6f6f6; padding: 1rem; border-radius: .25rem; text-transform: uppercase; font-weight: 700;">Verify</a>
          </div>
          <p>
            If the above link did not work, please got to
            <a href="#">https://construction-calculator.com/verify-email</a>
            and use the following code to verify your email address.
          </p>
          <p
            style="font-size: 1.5rem; font-weight: 600; font-style: italic; color: gray;">
            ${code}
          </p>
        </td>
      </tr>
      <!-- email-footer -->
      <tr>
        <td style="text-align: center; color: gray;">
          <hr>
          <p>
            <i>Useful links: </i>
            <a href="#"
              style="padding: 0 2rem;border-right: 1px solid gray;">Home</a>
            <a href="#"
              style="padding: 0 2rem;border-right: 1px solid gray;">About</a>
            <a href="#" style="padding: 0 2rem;">Contact Us</a>
          </p>

          <p>
            You are receiving this
            email because you
            have registered with Construction Calculator. If you did not
            register, please ignore this email.
          </p>
          <p>&copy; 2023 Construction Calculator. All rights reserved.</p>
        </td>
      </tr>

    </table>
  </div>
</body>

</html>

`
}
