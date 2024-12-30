import React from 'react';

const contacts = [
    { name: "Bob Tree", email: "bob.tree@freshdesk.com", phone: "8295701297" },
    { name: "Clarice Boone", email: "clboone@freshdesk.com" },
    { name: "Emily Garcia", email: "emily.garcia@freshdesk.com", phone: "+448081698824" },
    { name: "Emily Dean", email: "emily.dean@freshdesk.com", phone: "257715491" },
    { name: "Finch Hoot", email: "finchhoot1@freshdesk.com" },
    { name: "Freshdesk", email: "support@freshdesk.com" },
    { name: "Joe Mathew", email: "joe.mathew@freshdesk.com" },
    { name: "Johnny Appleseed", email: "johnny.appleseed@freshdesk.com", phone: "123412834" },
    { name: "Lewis Clarke", email: "lewis.clarke@freshdesk.com" },
    { name: "Maria Von Trapp", email: "soundofmusic@freshdesk.com" },
    { name: "Mark Colbert", email: "mark.colbert@freshdesk.com" },
    { name: "Matt Rogers", email: "matt.rogers@freshdesk.com", company: "Acme Inc." },
    { name: "Phileas Fogg", email: "aroundtheworld80@freshdesk.com" },
    { name: "Sam Kart", email: "sam.kart@freshdesk.com" },
    { name: "Sarah James", email: "sarah.james@freshdesk.com", phone: "+1855747676" }
];

function ContactsPage() {
    const handleButtonClick = (action) => {
        alert(`Button clicked: ${action}`);
    };

    return (
        <div className="flex h-screen bg-teal-50">
            <main className="flex-1 p-6 bg-teal-100 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <input type="text" placeholder="Search all contacts" className="border p-2 rounded-lg w-64 border-teal-300 focus:outline-none focus:border-teal-500" />
                    </div>
                    <div className="flex items-center">
                        <button className="bg-teal-600 text-white border border-teal-700 p-2 rounded-lg hover:bg-teal-700 mr-2" onClick={() => handleButtonClick('New')}>New</button>
                        <button className="bg-teal-600 text-white border border-teal-700 p-2 rounded-lg hover:bg-teal-700 mr-2" onClick={() => handleButtonClick('Export')}>Export</button>
                        <button className="bg-teal-600 text-white border border-teal-700 p-2 rounded-lg hover:bg-teal-700 mr-2" onClick={() => handleButtonClick('Import')}>Import</button>
                        <button className="bg-teal-600 text-white border border-teal-700 p-2 rounded-lg hover:bg-teal-700" onClick={() => handleButtonClick('Sync')}>Sync</button>
                    </div>
                </div>
                <table className="w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-teal-600 text-white">
                            <th className="p-4"><input type="checkbox" /></th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Company</th>
                            <th className="p-4">Email address</th>
                            <th className="p-4">Work phone</th>
                            <th className="p-4">Facebook</th>
                            <th className="p-4">Twitter</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={index} className="border-b hover:bg-teal-50 transition duration-200">
                                <td className="p-4"><input type="checkbox" /></td>
                                <td className="p-4 flex items-center">
                                    <div className="bg-teal-300 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-white font-bold">
                                        {contact.name.charAt(0)}
                                    </div>
                                    {contact.name}
                                </td>
                                <td className="p-4">--</td>
                                <td className="p-4">{contact.company || '--'}</td>
                                <td className="p-4">{contact.email}</td>
                                <td className="p-4">{contact.phone || '--'}</td>
                                <td className="p-4">--</td>
                                <td className="p-4">--</td>
                                <td className="p-4 text-teal-500 cursor-pointer"><i className="fas fa-ellipsis-v"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <span>1 - 15 of 15</span>
                    <div className="flex items-center">
                        <button className="bg-teal-600 text-white border border-teal-700 p-2 rounded-lg hover:bg-teal-700 mr-2" onClick={() => handleButtonClick('Previous')}> &lt; </button>
                        <button className="bg-teal-600 text-white border border-teal-700 p-2 rounded-lg hover:bg-teal-700" onClick={() => handleButtonClick('Next')}> &gt; </button>
                    </div>
                </div>
            </main>
            <aside className="w-1/6 p-6 bg-teal-200 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block mb-2 text-teal-700">Created</label>
                    <select className="border p-2 rounded-lg w-full border-teal-300 focus:outline-none focus:border-teal-500">
                        <option>Any time</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-teal-700">Time zone</label>
                    <select className="border p-2 rounded-lg w-full border-teal-300 focus:outline-none focus:border-teal-500">
                        <option>Any</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-teal-700">Tags</label>
                    <select className="border p-2 rounded-lg w-full border-teal-300 focus:outline-none focus:border-teal-500">
                        <option>Any</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-teal-700">Companies</label>
                    <select className="border p-2 rounded-lg w-full border-teal-300 focus:outline-none focus:border-teal-500">
                        <option>Any</option>
                    </select>
                </div>
                <button className="bg-teal-600 text-white p-2 rounded-lg w-full hover:bg-teal-700" onClick={() => handleButtonClick('Apply')}>Apply</button>
            </aside>
        </div>
    );
}

export default ContactsPage;
