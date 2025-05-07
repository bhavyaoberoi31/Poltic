import React from 'react';
import img from "../assets/logo1.svg"

export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-800 px-4 py-10 md:px-10 lg:px-24 ">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="flex justify-center">
            {/* Logo placeholder */}
            <img src={img}/>
          </div>
  
          <section className="bg-white border p-6 rounded-2xl shadow-lg space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center">Privacy Policy</h1>
            <p className="text-base md:text-lg">
              PolTic is a new social media platform for the young generation to share and consume news, breaking, and trending topics through creative short videos, directly from the citizens. We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and secure your data.
            </p>
  
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">1. What We Collect</h2>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Personal Info:</strong> Your name, email & profile picture (if Google login).</li>
                <li><strong>Content:</strong> Videos, posts, and comments you upload.</li>
              </ul>
            </div>
  
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">2. How We Use It</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>To enable video uploading, viewing, and other features.</li>
                <li>To review your content for compliance with guidelines.</li>
                <li>To fix issues and enhance platform features.</li>
              </ul>
            </div>
  
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Data Sharing</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>We do not sell or use your data for advertising.</li>
                <li>We may share data with service providers (e.g., hosting, analytics) to improve the platform.</li>
              </ul>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">4. Security</h2>
              <p>We take reasonable steps to protect your data and keep it safe.</p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">5. Children’s Privacy</h2>
              <p>PolTic is not intended for users under 13 years old.</p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">6. Your Rights</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>You can update your profile details anytime.</li>
                <li>You can request account deletion by contacting us.</li>
              </ul>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">7. Policy Updates</h2>
              <p>We may update this policy occasionally. Any changes will be posted here.</p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">8. Contact</h2>
              <p>Email: <a href="mailto:officialpoltic@gmail.com" className="text-blue-600 underline">officialpoltic@gmail.com</a></p>
            </div>
          </section>
  
          <section className="bg-white border p-6 rounded-2xl shadow-lg space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center">Community Guidelines</h1>
            <p className="text-base md:text-lg">
              PolTic is a platform for creative expression and engagement. To maintain a safe and enjoyable environment, we ask users to follow these guidelines:
            </p>
  
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Respect Others:</strong> Always be respectful and kind. Harassment, hate speech, or bullying will not be tolerated.</li>
              <li><strong>No Misinformation:</strong> Share accurate and verified information. Do not spread fake news or rumors.</li>
              <li><strong>Avoid Harmful Material:</strong> Do not post content that is violent, explicit, or abusive. Content promoting harm or illegal activities will be removed.</li>
            </ul>
  
            <p>
              By following these guidelines, you help ensure that PolTic remains a positive and supportive space for all users.
            </p>
          </section>
        </div>
      </div>
    );
  }
  