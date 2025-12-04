import mustache from "mustache";
import juice from "juice";
import formData from "form-data";
import Mailgun from "mailgun.js";

async function validateToken(ip: string, token: string, secret: string) {
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json();
  return outcome.success;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const mailgun = new Mailgun(formData as any);
  const client = mailgun.client({ username: "api", key: config.mailgunApi });
  const turnstileSecret = config.nuxtTurnstileSecretKey || "";

  // Validate the request body
  const { error } = contactValidationSchema.validate(body, {
    abortEarly: false,
  });

  if (error) {
    setResponseStatus(event, 403);
    return error?.details;
  }

  // Validate Turnstile token
  const token = (body.token || body["cf-turnstile-response"] || "") as string;
  let ip = event.node.req.headers["cf-connecting-ip"] || "";
  if (Array.isArray(ip)) {
    ip = ip[0];
  }

  if (!(await validateToken(ip, token, turnstileSecret))) {
    setResponseStatus(event, 400);
    return { error: "Invalid token" };
  }

  // Prep email data
  const emailData = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    message: body.message,
    year: new Date().getFullYear(),
  };

  try {
    // Get email templates from assets
    const assets = useStorage("assets:server");
    const contactTemplate = await assets.getItem("emails/contact-email.html");
    const thankYouTemplate = await assets.getItem(
      "emails/contact-thank-you-email.html",
    );

    if (
      typeof contactTemplate !== "string" ||
      typeof thankYouTemplate !== "string"
    ) {
      setResponseStatus(event, 500);
      return { error: "Email template not found." };
    }

    // Send notification email to farm
    let html = juice(mustache.render(contactTemplate, emailData));
    let data = {
      from: "postmaster@mailgun.fourgreenfieldsfarm.com", // Update with actual domain
      to: "fourgreenfieldsman@yahoo.com",
      "h:Reply-To": emailData.email,
      subject: `Contact Form: ${emailData.name}`,
      html,
    };

    await client.messages.create(config.mailgunDomain, data);

    // Send thank you email to customer
    html = juice(mustache.render(thankYouTemplate, emailData));
    data = {
      from: "postmaster@mailgun.fourgreenfieldsfarm.com",
      to: body.email,
      "h:Reply-To": "fourgreenfieldsman@yahoo.com",
      subject: "Thank You for Contacting Four Green Fields Farm",
      html,
    };

    await client.messages.create(config.mailgunDomain, data);

    return {
      success: true,
      message:
        "Thank you for contacting us, we will get back to you as soon as possible.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    setResponseStatus(event, 500);
    return {
      success: false,
      message: "Failed to send message.",
    };
  }
});
