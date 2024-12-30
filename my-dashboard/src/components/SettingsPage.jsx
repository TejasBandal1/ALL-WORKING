import React from 'react';

const SettingsPage = () => {
  return (
    <div className="flex h-screen bg-teal-50">
      <aside className="w-1/5 bg-teal-900 text-white p-4 sticky top-0 h-screen">
        <div className="flex items-center mb-8">
          <div className="bg-teal-500 rounded-full w-10 h-10 flex items-center justify-center">
            <i className="fas fa-headset"></i>
          </div>
          <h1 className="ml-4 text-xl">Settings</h1>
        </div>
        <nav>
          <ul>
            {['Team', 'Channels', 'Workflows', 'Agent Productivity', 'Support Operations', 'Account'].map((item, index) => (
              <li key={index} className="mb-4 flex items-center hover:bg-teal-700 p-2 rounded cursor-pointer">
                <i className={`fas fa-${['users', 'comments', 'cogs', 'tasks', 'life-ring', 'user-circle'][index]} mr-2`}></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="w-4/5 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl">Team</h2>
          <div className="flex items-center">
            <button className="bg-teal-700 text-white py-2 px-4 rounded hover:bg-teal-800 mr-4" onClick={() => alert('New clicked')}>
              New
            </button>
            <input type="text" placeholder="Search" className="border border-teal-400 p-2 mr-4 rounded focus:outline-none focus:border-teal-600" />
            <i className="fas fa-bell mr-4 cursor-pointer hover:text-teal-700" onClick={() => alert('Notification clicked')}></i>
            <i className="fas fa-question-circle mr-4 cursor-pointer hover:text-teal-700" onClick={() => alert('Help clicked')}></i>
            <i className="fas fa-th mr-4 cursor-pointer hover:text-teal-700" onClick={() => alert('Dashboard clicked')}></i>
          </div>
        </header>
        <section>
          <h3 className="text-xl mb-4">Team</h3>
          <div className="grid grid-cols-3 gap-8 mb-8">
            {[
              { icon: 'user-friends', title: 'Agents', description: 'Define agents\' scope of work, type, language, and other details.' },
              { icon: 'users-cog', title: 'Groups', description: 'Organize agents and receive notifications on unattended tickets.' },
              { icon: 'user-shield', title: 'Roles', description: 'Provide and restrict fine-grained levels of access and privileges for agents.' },
              { icon: 'clock', title: 'Business Hours', description: 'Define working hours and holidays to set expectations with customers.' },
              { icon: 'tools', title: 'Skills', description: 'Automatically assign certain kind of tickets to agents based on their expertise.' },
              { icon: 'calendar-alt', title: 'Agent Shifts', description: 'Create and effectively manage agent schedules in one place.' },
              { icon: 'user-clock', title: 'Agent Statuses', description: 'Configure statuses to define agent availability and get clear visibility on where they spend their time.', new: true },
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded shadow hover:bg-teal-100 cursor-pointer" onClick={() => alert(`${item.title} clicked`)}>
                <i className={`fas fa-${item.icon} text-2xl mr-4 text-teal-600`}></i>
                <div>
                  <h4 className="text-lg">
                    {item.title}
                    {item.new && <span className="text-green-500 ml-2">New</span>}
                  </h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-xl mb-4">Channels</h3>
          <div className="grid grid-cols-3 gap-8 mb-8">
            {[
              { icon: 'portal-enter', title: 'Portals', description: 'Customize the branding, visibility, and structure of your self-service portal.' },
              { icon: 'facebook', title: 'Facebook', description: 'Associate your Facebook page to pull in customer posts, comments, and messages as tickets.' },
              { icon: 'envelope', title: 'Email', description: 'Integrate support mailboxes, configure DKIM, custom mail servers, Bcc and more.' },
              { icon: 'phone', title: 'Phone', description: 'Run a virtual call center and manage phone conversations with Freshcaller.' },
              { icon: 'comment-dots', title: 'Feedback Form', description: 'Embed your ticket form as a widget to receive customer feedback.' },
              { icon: 'comments', title: 'Chat', description: 'Offer instantaneous support on your website or app with Freshchat.' },
              { icon: 'widgets', title: 'Widgets', description: 'Embed help articles or a contact form on your website or product.' },
              { icon: 'whatsapp', title: 'WhatsApp', description: 'Integrate your WhatsApp business number to support customers and offer instant resolutions.' },
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded shadow hover:bg-teal-100 cursor-pointer" onClick={() => alert(`${item.title} clicked`)}>
                <i className={`fas fa-${item.icon} text-2xl mr-4 text-teal-600`}></i>
                <div>
                  <h4 className="text-lg">{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
