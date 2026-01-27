# EmailJS Setup Instructions

To make the contact form work with EmailJS, follow these steps:

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account

## 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection process

## 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact From Portfolio

**HTML Content:**
```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact From Portfolio</h1>
            <p>You have received a new message from your portfolio website</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">{{from_name}}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">{{from_email}}</div>
            </div>
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">{{message}}</div>
            </div>
        </div>
    </div>
</body>
</html>
```

## 4. Get Your Credentials
1. Go to "Integration" or "API Keys" section
2. Copy your **Public Key**
3. Note your **Service ID** (from Email Services)
4. Note your **Template ID** (from Email Templates)

## 5. Update the Contact Component
In `src/app/components/Contact.tsx`, replace the placeholder values:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',
  TEMPLATE_ID: 'your_actual_template_id', 
  PUBLIC_KEY: 'your_actual_public_key'
};
```

## 6. Test the Form
1. Restart your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check if you receive the email

## Features
- ✅ Direct email sending (no mailto)
- ✅ No email client popup
- ✅ Professional email template
- ✅ Error handling
- ✅ Loading states
- ✅ Success/error messages
- ✅ Form validation
- ✅ Mobile responsive

## Troubleshooting
- If emails don't send, check your EmailJS service connection
- Verify all template variables match (`{{from_name}}`, `{{from_email}}`, `{{message}}`)
- Check browser console for any error messages
- Ensure your EmailJS account is active
