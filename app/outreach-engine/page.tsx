"use client";

import { useMemo, useState } from "react";

type NicheType = "airbnb" | "realtor" | "property_manager" | "any";
type LeadStageType = "cold" | "warm" | "ghost";

type SavedOutreachEntry = {
  id: number;
  contactName: string;
  companyName: string;
  niche: NicheType;
  leadStage: LeadStageType;
  scriptLabel: string;
  message: string;
  notes: string;
  savedAt: string;
};

const scripts = {
  script1: {
    label: "Script 1 — Airbnb Host (Cold, never spoken)",
    tactics: "Tactics: Accusation audit + labeling + calibrated question",
    niche: "airbnb",
    leadStage: "cold",
    message: `I know you probably get a hundred messages from cleaning companies that all sound the same.
Most Airbnb hosts I talk to are dealing with one thing — a cleaner who's inconsistent and it's quietly killing their reviews.
Is that something you're running into?`,
  },
  script2: {
    label: "Script 2 — Realtor (Cold outreach)",
    tactics: "Tactics: Accusation audit + future pacing + calibrated question",
    niche: "realtor",
    leadStage: "cold",
    message: `I'll be straight — you've probably tried a cleaning service that didn't show up or cut corners on a listing day.
What does it cost you when a property isn't show-ready on time?`,
  },
  script3: {
    label: "Script 3 — Property Manager (Cold)",
    tactics: "Tactics: Labeling + loss aversion + late empathy",
    niche: "property_manager",
    leadStage: "cold",
    message: `It sounds like you're juggling a lot of units and the last thing you need is a cleaner you have to babysit.
I'm not here to pitch you. I just want to know — what does your current situation actually look like?`,
  },
  script4: {
    label: "Script 4 — Airbnb Host (Warm — they engaged with content or were referred)",
    tactics: "Tactics: Mirroring + calibrated question + autonomy frame",
    niche: "airbnb",
    leadStage: "warm",
    message: `Someone mentioned you might be looking for a more reliable turnover team.
No pressure at all — what's been the biggest frustration with whoever you're using now?`,
  },
  script5: {
    label: "Script 5 — Any niche (Re-engage a ghost — they went quiet after initial contact)",
    tactics: "Tactics: Mislabeling to provoke a response + late empathy",
    niche: "any",
    leadStage: "ghost",
    message: `I'm guessing you moved on and found someone — totally fair.
If I'm wrong, I'm still here.`,
  },
  script6: {
    label: "Warm Lead (Any niche)",
    tactics: "Mirroring + Autonomy frame + Calibrated question",
    niche: "any",
    leadStage: "warm",
    message: `[Their name] mentioned you might be looking for a more reliable cleaning team.
No pressure at all — what's been the biggest headache with whoever you're using now?`,
  },
  script7: {
    label: "Property Manager (Warm)",
    tactics: "Labeling + Autonomy frame + Calibrated question",
    niche: "property_manager",
    leadStage: "warm",
    message: `It sounds like you've been looking for something more consistent — someone you don't have to follow up behind.
What's been the biggest frustration with whoever you've been using?`,
  },
  script8: {
    label: "Realtor (Warm)",
    tactics: "Accusation audit + Future pacing + Calibrated question",
    niche: "realtor",
    leadStage: "warm",
    message: `You've probably had a cleaner drop the ball right before a showing at least once.
What does it look like for you when a listing isn't ready on time?`,
  },
} as const;

export default function OutreachEnginePage() {
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [niche, setNiche] = useState<NicheType>("airbnb");
  const [leadStage, setLeadStage] = useState<LeadStageType>("cold");
  const [notes, setNotes] = useState("");
  const [savedEntries, setSavedEntries] = useState<SavedOutreachEntry[]>([]);

  const selectedScript = useMemo(() => {
    if (leadStage === "ghost") {
      return scripts.script5;
    }

    if (niche === "airbnb" && leadStage === "cold") {
      return scripts.script1;
    }

    if (niche === "realtor" && leadStage === "cold") {
      return scripts.script2;
    }

    if (niche === "property_manager" && leadStage === "cold") {
      return scripts.script3;
    }

    if (niche === "airbnb" && leadStage === "warm") {
      return scripts.script4;
    }

    if (niche === "realtor" && leadStage === "warm") {
      return scripts.script8;
    }

    if (niche === "property_manager" && leadStage === "warm") {
      return scripts.script7;
    }

    if (niche === "any" && leadStage === "warm") {
      return scripts.script6;
    }

    return {
      label: "No exact script match",
      tactics: "Choose a different niche / lead stage combination",
      niche: niche,
      leadStage: leadStage,
      message: "No exact script is assigned to this combination yet.",
    };
  }, [niche, leadStage]);

  const personalizedMessage = useMemo(() => {
    let base = selectedScript.message;

    if (base.includes("[Their name]")) {
      base = base.replace(
        "[Their name]",
        contactName.trim() ? contactName.trim() : "Someone"
      );
    }

    if (!contactName.trim()) {
      return base;
    }

    return `Hey ${contactName.trim()},\n\n${base}`;
  }, [selectedScript, contactName]);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(personalizedMessage);
      alert("Message copied.");
    } catch {
      alert("Could not copy message.");
    }
  };

  const copyLabel = async () => {
    try {
      await navigator.clipboard.writeText(selectedScript.label);
      alert("Script label copied.");
    } catch {
      alert("Could not copy script label.");
    }
  };

  const saveEntry = () => {
    const newEntry: SavedOutreachEntry = {
      id: Date.now(),
      contactName,
      companyName,
      niche,
      leadStage,
      scriptLabel: selectedScript.label,
      message: personalizedMessage,
      notes,
      savedAt: new Date().toLocaleString(),
    };

    setSavedEntries((prev) => [newEntry, ...prev]);
    alert("Outreach entry saved in this session.");
  };

  const resetForm = () => {
    setContactName("");
    setCompanyName("");
    setNiche("airbnb");
    setLeadStage("cold");
    setNotes("");
  };

  const copySavedMessage = async (message: string) => {
    try {
      await navigator.clipboard.writeText(message);
      alert("Saved message copied.");
    } catch {
      alert("Could not copy saved message.");
    }
  };

  const nicheLabel =
    niche === "airbnb"
      ? "Airbnb Host"
      : niche === "realtor"
        ? "Realtor"
        : niche === "property_manager"
          ? "Property Manager"
          : "Any";

  const stageLabel =
    leadStage === "cold"
      ? "Cold"
      : leadStage === "warm"
        ? "Warm"
        : "Ghost / Re-engage";

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Offer + Outreach Engine</h1>
        <p className="text-zinc-400 mb-8">
          Pick the niche and lead stage, then use the exact script assigned to that situation.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 bg-zinc-900 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Lead Inputs</h2>

            <input
              className="w-full p-3 rounded bg-white text-black"
              placeholder="Contact name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />

            <input
              className="w-full p-3 rounded bg-white text-black"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <select
              className="w-full p-3 rounded bg-white text-black"
              value={niche}
              onChange={(e) => setNiche(e.target.value as NicheType)}
            >
              <option value="airbnb">Airbnb Host</option>
              <option value="realtor">Realtor</option>
              <option value="property_manager">Property Manager</option>
              <option value="any">Any</option>
            </select>

            <select
              className="w-full p-3 rounded bg-white text-black"
              value={leadStage}
              onChange={(e) => setLeadStage(e.target.value as LeadStageType)}
            >
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="ghost">Ghost / Re-engage</option>
            </select>

            <textarea
              className="w-full p-3 rounded bg-white text-black min-h-[140px]"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={saveEntry}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
              >
                Save Outreach Entry
              </button>

              <button
                onClick={resetForm}
                className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">
            <div className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Matched Script</p>
              <p className="text-xl font-bold mb-2">{selectedScript.label}</p>
              <p className="text-sm text-zinc-400">{selectedScript.tactics}</p>

              <div className="mt-4 text-sm space-y-1">
                <p>Niche: {nicheLabel}</p>
                <p>Lead Stage: {stageLabel}</p>
                <p>Company: {companyName || "-"}</p>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Outreach Message</p>
              <pre className="whitespace-pre-wrap text-sm text-white font-sans">
                {personalizedMessage}
              </pre>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={copyMessage}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Copy Message
                </button>

                <button
                  onClick={copyLabel}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Copy Script Label
                </button>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-zinc-400 text-sm mb-4">Saved Outreach Entries (Session Only)</p>

              {savedEntries.length === 0 ? (
                <p className="text-sm text-zinc-500">No saved entries yet.</p>
              ) : (
                <div className="space-y-4 max-h-[900px] overflow-y-auto pr-2">
                  {savedEntries.map((entry) => (
                    <div key={entry.id} className="border border-zinc-800 rounded-xl p-4">
                      <p className="font-semibold">
                        {entry.contactName || "Unnamed Contact"}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {entry.companyName || "No company"}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {entry.scriptLabel}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Saved: {entry.savedAt}
                      </p>

                      <div className="mt-3 text-sm space-y-1">
                        <p>Niche: {entry.niche}</p>
                        <p>Lead Stage: {entry.leadStage}</p>
                        <p>Notes: {entry.notes || "-"}</p>
                      </div>

                      <div className="mt-3">
                        <pre className="whitespace-pre-wrap text-sm text-white font-sans bg-zinc-950 p-3 rounded">
                          {entry.message}
                        </pre>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => copySavedMessage(entry.message)}
                          className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded text-sm"
                        >
                          Copy Saved Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}