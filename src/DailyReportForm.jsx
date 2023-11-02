import React, { useState, useEffect } from "react";

const DailyReportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    yesterday: "",
    today: "",
    blockers: "",
  });

  const [generatedReport, setGeneratedReport] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const generateReport = () => {
    const now = new Date();
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    const formattedDate = now.toLocaleDateString("en-US", dateOptions);
    const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

    const report = `Daily Report - ${formattedDate}, ${formattedTime} (BD Time)

Name: ${formData.name}

What did you work on Yesterday?
-------------------------------------
${formData.yesterday}

What are you planning to do today?
-------------------------------------
${formData.today}

Do you have any blockers?
-------------------------------------
${formData.blockers}`;

    setGeneratedReport(report);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReport).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }).catch((error) => {
      console.error("Error copying to clipboard:", error);
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      yesterday: "",
      today: "",
      blockers: "",
    });
    setGeneratedReport("");
  };

  const shareReportInWhatsApp = () => {
    const message = encodeURIComponent(generatedReport);
    const whatsappLink = `whatsapp://send?text=${message}`;
    window.location.href = whatsappLink;
  };

  useEffect(() => {
    setFormValid(formData.name && formData.yesterday && formData.today && formData.blockers);
  }, [formData.name, formData.yesterday, formData.today, formData.blockers]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Daily Report</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            className="w-full border rounded py-2 px-3"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        {/* Other input fields using handleInputChange */}
        <div className="mb-4 flex justify-center text-sm">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
            onClick={copyToClipboard}
          >
            {copySuccess ? "Copied!" : "Copy Report"}
          </button>
          <button
            className="bg-gray-300 hover-bg-gray-400 text-gray-800 py-1 px-2 rounded mx-2"
            onClick={resetForm}
          >
            Reset
          </button>
          <button
            className={`${
              formValid
                ? "bg-green-500 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            } text-white py-1 px-2 rounded mx-2`}
            onClick={shareReportInWhatsApp}
            disabled={!formValid}
          >
            Share in WhatsApp
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Generated Report</h2>
        <textarea
          className="w-full border rounded py-2 px-3 text-sm"
          rows="8"
          value={generatedReport}
          readOnly
        />
      </div>
    </div>
  );
};

export default DailyReportForm;
