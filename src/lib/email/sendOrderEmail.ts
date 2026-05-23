import nodemailer from "nodemailer";
import { OrderItem, ShippingAddress } from "../types/order";

type OrderEmailPayload = {
  orderId: string;
  placedAt: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedDelivery?: string;
  trackingNumber?: string;
};

function buildOrderEmailHtml(payload: OrderEmailPayload) {
  const itemsHtml = payload.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:12px 0;border-bottom:1px solid #e8e8e8;vertical-align:middle;">
            <div style="font-size:14px;font-weight:600;color:#0F1111;margin-bottom:2px;">${item.title}</div>
            <div style="font-size:13px;color:#565959;">Qty: ${item.quantity} &nbsp;|&nbsp; ₹${item.price.toLocaleString("en-IN")} each</div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #e8e8e8;text-align:right;vertical-align:middle;font-weight:600;white-space:nowrap;">
            ₹${(item.price * item.quantity).toLocaleString("en-IN")}
          </td>
        </tr>`,
    )
    .join("");

  const estimatedDeliveryRow = payload.estimatedDelivery
    ? `<tr>
        <td style="padding:6px 0;color:#565959;">Estimated Delivery</td>
        <td style="padding:6px 0;text-align:right;font-weight:600;color:#007600;">${payload.estimatedDelivery}</td>
      </tr>`
    : "";

  const trackingRow = payload.trackingNumber
    ? `<p style="font-size:13px;color:#565959;margin:8px 0 0;">
        Tracking Number: <strong style="color:#0F1111;">${payload.trackingNumber}</strong>
      </p>`
    : "";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Order Confirmed</title></head>
    <body style="margin:0;padding:0;background:#f3f3f3;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;padding:24px 0;">
        <tr><td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

            <!-- Brand Header Banner -->
            <tr>
              <td style="background:#232f3e;padding:20px 32px;text-align:left;">
                <span style="font-size:26px;font-weight:bold;color:#FF9900;letter-spacing:-0.5px;">amazon</span>
              </td>
            </tr>

            <!-- Green Confirmation Strip -->
            <tr>
              <td style="background:#067D62;padding:20px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="font-size:20px;font-weight:bold;color:#ffffff;">Order Confirmed ✓</div>
                      <div style="font-size:13px;color:rgba(255,255,255,0.85);margin-top:4px;">
                        Hello ${payload.shippingAddress.firstName || "Customer"}, thank you for your order!
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Order Core Meta Block -->
            <tr>
              <td style="padding:20px 32px;border-bottom:1px solid #e8e8e8;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="font-size:12px;color:#565959;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Order ID</div>
                      <div style="font-size:15px;font-weight:bold;color:#0F1111;">${payload.orderId}</div>
                    </td>
                    <td style="text-align:right;">
                      <div style="font-size:12px;color:#565959;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Order Date</div>
                      <div style="font-size:14px;color:#0F1111;">${new Date(payload.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Products Segment -->
            <tr>
              <td style="padding:20px 32px;">
                <div style="font-size:14px;font-weight:bold;color:#0F1111;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;">Items Ordered</div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${itemsHtml}
                </table>
              </td>
            </tr>

            <!-- Totals Breakdowns Card -->
            <tr>
              <td style="padding:0 32px 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:4px;padding:16px;" >
                  <tr>
                    <td style="padding:0 16px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:6px 0;color:#565959;">Subtotal</td>
                          <td style="padding:6px 0;text-align:right;">₹${payload.subtotal.toLocaleString("en-IN")}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;color:#565959;">Delivery</td>
                          <td style="padding:6px 0;text-align:right;color:${payload.deliveryFee === 0 ? "#007600" : "#0F1111"};">
                            ${payload.deliveryFee === 0 ? "FREE" : `₹${payload.deliveryFee.toLocaleString("en-IN")}`}
                          </td>
                        </tr>
                        ${estimatedDeliveryRow}
                        <tr>
                          <td style="padding:10px 0 6px;border-top:2px solid #e8e8e8;font-size:16px;font-weight:bold;color:#0F1111;">Order Total</td>
                          <td style="padding:10px 0 6px;border-top:2px solid #e8e8e8;text-align:right;font-size:16px;font-weight:bold;color:#B12704;">₹${payload.total.toLocaleString("en-IN")}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Shipping Information Segment -->
            <tr>
              <td style="padding:0 32px 28px;">
                <div style="font-size:14px;font-weight:bold;color:#0F1111;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;">Shipping To</div>
                <div style="font-size:13px;color:#565959;line-height:1.7;">
                  <strong style="color:#0F1111;">${payload.shippingAddress.firstName} ${payload.shippingAddress.lastName}</strong><br/>
                  ${payload.shippingAddress.address}${payload.shippingAddress.apartment ? `, ${payload.shippingAddress.apartment}` : ""}<br/>
                  ${payload.shippingAddress.city}, ${payload.shippingAddress.state} ${payload.shippingAddress.postalCode}<br/>
                  ${payload.shippingAddress.country}<br/>
                  <span style="color:#0F1111;">${payload.shippingAddress.phone}</span>
                </div>
                ${trackingRow}
              </td>
            </tr>

            <!-- Fixed System Footer -->
            <tr>
              <td style="background:#f3f3f3;padding:16px 32px;text-align:center;border-top:1px solid #e8e8e8;">
                <p style="font-size:12px;color:#767676;margin:0;">
                  © ${new Date().getFullYear()} Amazon.in &nbsp;|&nbsp; This is an automated confirmation email. Please do not reply.
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

export async function sendOrderConfirmationEmail(
  payload: OrderEmailPayload,
): Promise<{ sent: boolean; error?: string }> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: payload.shippingAddress.email,
      subject: `Order Confirmed - ${payload.orderId}`,
      html: buildOrderEmailHtml(payload),
    });

    console.log("Email sent successfully");

    return { sent: true };
  } catch (error: any) {
    console.error("Email error:", error);

    return {
      sent: false,
      error: error.message,
    };
  }
}