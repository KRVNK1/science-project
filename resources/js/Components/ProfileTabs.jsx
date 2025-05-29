import { useState } from "react";

export default function ProfileTabs({ tabs, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
        <div>
            <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
        </div>
    );
}
