"use client";

import { useState } from 'react';
import { AuthProvider, useAuth } from '../lib/auth-context';
import AuthModal from '../components/auth-modal';

// Header component that shows auth status
function Header() {
  const { user, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">AI Tools for Marketers</h1>
            <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">AI Tools for Marketers</h1>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              Feedback
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {user.user_metadata?.name || user.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </header>
  );
}

// Main app content
function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        {children}
      </main>
    </div>
  );
}

// Root layout with AuthProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}
