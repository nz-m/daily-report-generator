import { useState, useEffect } from "react";

const DailyReportForm = () => {
  const [name, setName] = useState("");
  const [yesterday, setYesterday] = useState("");
  const [today, setToday] = useState("");
  const [blockers, setBlockers] = useState("");
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

Name: ${name}

What did you work on Yesterday?
-------------------------------------
${yesterday}

What are you planning to do today?
-------------------------------------
${today}

Do you have any blockers?
-------------------------------------
${blockers}`;

    setGeneratedReport(report);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReport).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    });
  };

  const resetForm = () => {
    setName("");
    setYesterday("");
    setToday("");
    setBlockers("");
    setGeneratedReport("");
  };

  const shareReportInWhatsApp = () => {
    const message = encodeURIComponent(generatedReport);
    const whatsappLink = `whatsapp://send?text=${message}`;
    window.location.href = whatsappLink;
  };

  useEffect(() => {
    setFormValid(name && yesterday && today && blockers);
  }, [name, yesterday, today, blockers]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Daily Report</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            className="w-full border rounded py-2 px-3"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              generateReport();
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            What did you work on Yesterday?
          </label>
          <textarea
            className="w-full border rounded py-2 px-3"
            rows="4"
            value={yesterday}
            onChange={(e) => {
              setYesterday(e.target.value);
              generateReport();
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            What are you planning to do today?
          </label>
          <textarea
            className="w-full border rounded py-2 px-3"
            rows="4"
            value={today}
            onChange={(e) => {
              setToday(e.target.value);
              generateReport();
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Do you have any blockers?
          </label>
          <textarea
            className="w-full border rounded py-2 px-3"
            rows="4"
            value={blockers}
            onChange={(e) => {
              setBlockers(e.target.value);
              generateReport();
            }}
          />
        </div>
        <div className="mb-4 flex justify-center text-sm">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2"
            onClick={copyToClipboard}
          >
            {copySuccess ? "Copied!" : "Copy Report"}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded mx-2"
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
