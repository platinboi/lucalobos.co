import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const EMAIL_TO = process.env.EMAIL_TO || 'luca.lobosco@hotmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Portfolio Contact <hello@hello.lucalobos.co>';

/**
 * API route for handling contact form submissions
 * 
 * For production:
 * 1. Sign up for an email service like Resend (https://resend.com)
 * 2. Add your API key to environment variables in Vercel
 *    - RESEND_API_KEY: Your Resend API key
 *    - EMAIL_FROM: The email address to send from (must be verified in Resend)
 *    - EMAIL_TO: The email address to send to
 */
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, interest, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Check if email service is configured
    if (!resend) {
      console.error('Email service not configured: RESEND_API_KEY environment variable is missing');
      return NextResponse.json(
        { error: 'Contact form is not properly configured. Please notify the site administrator.' },
        { status: 500 }
      );
    }

    // Format the interest option for better readability
    const formattedInterest = interest === 'ai-automation' 
      ? 'AI & Automation' 
      : interest === 'web-dev' 
        ? 'Web Development' 
        : interest === 'app-dev' 
          ? 'App Development' 
          : interest === 'consulting' 
            ? 'Consulting' 
            : interest;

    // Log the submission (for debugging)
    console.log('Contact form submission:', { name, email, interest: formattedInterest, message });
    
    // Log the email domain being used for sending
    console.log('Sending from:', EMAIL_FROM);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New Contact from ${name} - ${formattedInterest}`,
      text: `
Name: ${name}
Email: ${email}
Interest: ${formattedInterest}

Message:
${message}

---
Sent from your portfolio contact form
      `,
      replyTo: email,
    });

    // If there's an error from Resend
    if (error) {
      console.error('Resend API error:', error);
      console.error('Error message:', error.message);
      
      // Determine a more specific error message based on the error type
      let errorMessage = 'Failed to send email. Please try again later.';
      
      // Safe access to error properties
      const statusCode = (error as any).statusCode;
      if (statusCode === 403) {
        errorMessage = 'Email configuration error. The site admin has been notified.';
      } else if (statusCode === 429) {
        errorMessage = 'Too many messages sent. Please try again in a few minutes.';
      } else if (statusCode === 400) {
        errorMessage = 'Invalid request. Please check your information and try again.';
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // Return a success response with the email ID
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      emailId: data?.id 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
} 