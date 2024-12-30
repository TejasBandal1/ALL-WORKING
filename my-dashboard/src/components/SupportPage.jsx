import React from "react";

const Header = () => (
  <header className="flex justify-between items-center p-4 border-b bg-teal-100 shadow-md">
    {/* Logo and Title */}
    <div className="flex items-center">
      <img src="https://placehold.co/30x30" alt="HappyFox Logo" className="mr-2" />
      <span className="font-bold text-lg text-teal-800">Support Screen</span>
    </div>

    {/* Navigation Links */}
    <nav className="flex space-x-6">
      <a
        href="#"
        className="text-teal-700 hover:text-teal-900"
        onClick={() => alert("Language options clicked!")}
      >
        English <i className="fas fa-chevron-down"></i>
      </a>
      <a
        href="#"
        className="text-teal-700 hover:text-teal-900"
        onClick={() => alert("Agent Portal clicked!")}
      >
        Agent Portal
      </a>
      <a
        href="#"
        className="text-teal-700 hover:text-teal-900"
        onClick={() => alert("Submit Ticket clicked!")}
      >
        Submit Ticket
      </a>
      <a
        href="#"
        className="text-teal-700 hover:text-teal-900"
        onClick={() => alert("Forum clicked!")}
      >
        Forum
      </a>
      <a
        href="#"
        className="text-teal-700 hover:text-teal-900"
        onClick={() => alert("Knowledge Base clicked!")}
      >
        Knowledge Base
      </a>
    </nav>
  </header>
);

const MainSection = () => (
  <section className="bg-teal-600 text-white text-center py-20">
    <h1 className="text-4xl font-extrabold mb-6">How can we help you?</h1>
    <div className="max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Type in your question here..."
        className="w-full p-4 rounded-lg shadow-lg text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            alert(`You searched for: ${e.target.value}`);
          }
        }}
      />
    </div>
  </section>
);

const LoginSection = () => (
  <section className="bg-teal-50 text-center py-8">
    <p className="text-teal-700 font-medium">
      Looking for personalized support?{" "}
      <a
        href="#"
        className="text-teal-600 hover:underline"
        onClick={() => alert("Redirecting to Login Page!")}
      >
        Login here
      </a>
    </p>
  </section>
);

const CommonQuestions = () => (
  <section className="bg-teal-100 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-teal-800 mb-10">
        Common Questions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {/* Settings Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-teal-800">Settings</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'Cannot Access Settings'")}
              >
                Cannot Access Settings?
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'How to Factory Reset'")}
              >
                How to Factory Reset?
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'Identify Missing Settings'")}
              >
                Identify Missing Settings!
              </a>
            </li>
          </ul>
        </div>
        {/* Training Resources Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-teal-800">Training Resources</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'Archive of all Videos'")}
              >
                Archive of all Videos?
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'How to Download TS'")}
              >
                How to Download TS?
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'Quick Learning Resources'")}
              >
                Quick Learning Resources
              </a>
            </li>
          </ul>
        </div>
        {/* Logging In Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-teal-800">Logging In</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'How to hide login page'")}
              >
                How to hide login page?
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'Multiple times wrong password'")}
              >
                Multiple times wrong password
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-teal-600 hover:underline"
                onClick={() => alert("Navigating to 'Trouble Logging in via SSO'")}
              >
                Trouble Logging in via SSO
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const SupportPage = () => {
  return (
    <div>
      <Header />
      <main>
        <MainSection />
        <LoginSection />
        <CommonQuestions />
      </main>
    </div>
  );
};

export default SupportPage;
